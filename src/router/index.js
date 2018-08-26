import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Editor from '../components/Layout/Authorized/Editor'
import SignIn from '../components/Layout/NotAuthorized/SignIn'
import Profile from '../components/Layout/Authorized/Profile'

import Root from '../Root'

const routes = [
  {name: 'root', path: '/', component: Root},
  { name: 'sign-in', path: '/sign-in', component: SignIn },
  { name: 'editor', path: '/project/:projectId/chart/:chartId', component: Editor },
  { name: 'profile', path: '/profile', component: Profile}
]


const router = new VueRouter({
  mode: 'history',
  routes
})

export default router