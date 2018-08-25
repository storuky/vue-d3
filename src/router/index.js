import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Editor from '../components/Layout/Authorized/Editor'
import SignIn from '../components/Layout/NotAuthorized/SignIn'
import Profile from '../components/Layout/Authorized/Profile'

const routes = [
  { path: '/', component: Editor },
  { path: '/sign-in', component: SignIn },
  { path: '/project/:projectId/chart/:chartId', component: Editor },
  { path: '/profile', component: Profile}
]


const router = new VueRouter({
  mode: 'history',
  routes
})

export default router