import Vue from 'vue'
import Vuex from 'vuex'
import { db } from './config/db'

Vue.use(Vuex);

export default new Vuex.Store({
    // state: 여러 컴포넌트 간에 공유되는 데이터
    state: {
        uid: '',
        name: 'Guest',
        posts: null
    },
    // getters: 변경된 state 값을 받아온다
    getters: {
        uid: state => state.uid,
        name: state => state.name,
        getPosts: state => {
            return state.posts
        }
    },
    // mutations: state 값을 변경하기 위한 메소드를 정의한다
    // 동기적 로직을 정의
    mutations: {
        SET_POSTS(state, posts){
            state.posts = posts
          }
    },
    // 비동기적 로직을 정의
    actions: {
        fetchPosts({commit}){
            let posts = []
            db.collection('posts').orderBy('date').onSnapshot((snapshot) => {
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
            commit('SET_POSTS', posts)
        }
    }
})