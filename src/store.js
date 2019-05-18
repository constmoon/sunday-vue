import Vue from 'vue'
import Vuex from 'vuex'
import { db } from './config/db'

Vue.use(Vuex);

export default new Vuex.Store({
    // 여러 컴포넌트 간에 공유되는 데이터
    state: {
        uid: '',
        name: 'Guest',
        posts: null
    },
    // 상태 값이 변경되었을 때 변화에 따른 차이를 자동으로 반영하여 값을 계산
    getters: {
        uid: state => state.uid,
        name: state => state.name,
        getPosts: state => {
            return state.posts
        }
    },
    // 상태를 변경하는 비동기 처리 방법
    // Mutation 호출시 commit 사용
    actions: {
        updateUid ({ commit }, uid) {
            commit('user/UPDATE_UID', uid);
        },
        updateName ({ commit }, name) {
            commit('user/UPDATE_NAME', name);
        },
        setPosts: context => {
            context.commit('setPosts')
        }
    },
    // 상태를 변경하는 동기 처리 방법
    mutations: {
        ['user/UPDATE_UID'] (state, uid) {
            state.uid = uid;
        },
        ['user/UPDATE_NAME'] (state, name) {
            state.name = name;
        },
        setPosts: state => {
          let posts = []
     
          db.collection('posts').orderBy('date').onSnapshot((snapshot) => {
            posts = []
            snapshot.forEach((doc) => {
                posts.push({ id: doc.id, title: doc.data().title })
            })
     
            state.posts = posts
          })
        }
      },
})