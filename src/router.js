import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home'
import SignUp from './components/SignUp'
import PostForm from './components/PostForm'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
      {
        name: 'home',
        path: '/',
        component: Home
      },
      {
        name: 'signUp',
        path: '/signup',
        component: SignUp
      },
      {
        name: 'create',
        path: '/create',
        component: PostForm
      },
      {
        name: 'edit',
        path: '/edit/:id',
        component: PostForm,
        props: true
      }
    ]
})
export default router