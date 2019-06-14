import Vue from 'vue'
import Vuex from 'vuex'
const fb = require('./config/db')

Vue.use(Vuex);

export default new Vuex.Store({
    // state: 여러 컴포넌트 간에 공유되는 데이터
    state: {
        uid: '',
        username: 'Guest',
        posts: ''
    },
    // getters: 변경된 state 값을 받아온다
    getters: {
        uid: state => state.uid,
        username: state => state.username,
        posts: state => {
            if(state.posts.length){
                return state.posts
            }
        }
    },
    // mutations: state의 상태관리에 초점을 둔다.
    // mutation에 비동기 처리 로직들이 포함되면 같은 값에 대해 여러 개의 컴포넌트에서 변경을 요청했을 때 변경순서 파악이 어려워지므로
    // 동기적 로직을 정의한다.
    mutations: {
        ['user/UPDATE_UID'] (state, uid) {
            state.uid = uid;
        },
        ['user/UPDATE_USERNAME'] (state, username) {
            state.username = username;
        },
        SET_POSTS(state, posts){
            state.posts = posts
        }
    },
    // actions: 비동기적 로직을 정의한다(API 통신 등)
    // mutations에 정의된 메소드를 호출하는 방식으로 구현된다.
    actions: {
        updateUid ({ commit }, uid) {
            commit('user/UPDATE_UID', uid);
        },
        updateUserName ({ commit }, username) {
            commit('user/UPDATE_USERNAME', username);
        },
        fetchPosts({ commit }){
            let posts = []
            
            // 로그인된 유저의 글을 받아옴
            fb.auth.onAuthStateChanged(function(user) {
                if (user) {
                    // console.log(fb.auth.currentUser);    // currentUser object 리턴
                    fb.db.collection('posts').doc(user.uid).collection('posts').orderBy('date','desc').onSnapshot((snapshot) => {
                        snapshot.forEach((doc) => {
                            posts.push({ 
                                id: doc.id, 
                                title: doc.data().title,
                                content: doc.data().content,
                                link: doc.data().link,
                                tags: doc.data().tag,
                                date: doc.data().date
                            })
                        })
                    })
                    // commit 대상은 mutations에 선언된 메소드
                    commit('SET_POSTS', posts)
                }
                else {
                    // 로그인 상태 아님
                }
            })
        }
    }
})