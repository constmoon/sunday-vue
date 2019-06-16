import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './components/Home'
import LogIn from './components/Login'
import SignUp from './components/SignUp'
import PostForm from './components/PostForm'
import PostView from './components/PostView'
import EditPost from './components/EditPost'
import TagList from './components/TagList'

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
        name: 'login',
        path: '/login',
        component: LogIn
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
        name: 'post',
        path: '/post/:id',
        component: PostView,
        props: true
      },
      {
        name: 'edit',
        path: '/edit/:id',
        component: EditPost,
        props: true
      },
      {
        name: 'tag',
        path: '/tag/:tag',
        component: TagList,
        props: true
      }
    ]
})
export default router