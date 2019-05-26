import Vue from 'vue'
import Vuex from 'vuex'
import { db } from './config/db'

Vue.use(Vuex);

export default new Vuex.Store({
    // state: 여러 컴포넌트 간에 공유되는 데이터
    state: {
        uid: '',
        name: 'Guest',
        posts: ''
    },
    // getters: 변경된 state 값을 받아온다
    getters: {
        uid: state => state.uid,
        name: state => state.name,
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
        SET_POSTS(state, posts){
            state.posts = posts
        }
    },
    // actions: 비동기적 로직을 정의한다(API 통신 등)
    // mutations에 정의된 메소드를 호출하는 방식으로 구현된다.
    actions: {
        fetchPosts({ commit }){
            let posts = []
            db.collection('posts').orderBy('date','desc').onSnapshot((snapshot) => {
                snapshot.forEach((doc) => {
                    posts.push({ 
                        id: doc.id, 
                        title: doc.data().title,
                        content: doc.data().content,
                        tags: doc.data().tag,
                        date: doc.data().date
                    })
                })
              })
            // commit 대상은 mutations에 선언된 메소드
            commit('SET_POSTS', posts)
        }
    }
})