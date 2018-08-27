import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Editor from '../components/Layout/Authorized/Editor'
import SignIn from '../components/Layout/NotAuthorized/SignIn'
import SignUp from '../components/Layout/NotAuthorized/SignUp'
import ForgotPassword from '../components/Layout/NotAuthorized/ForgotPassword'
import Profile from '../components/Layout/Authorized/Profile'

import Dashboard from '../components/Layout/Authorized/Dashboard'

const routes = [
  { name: 'root', path: '/', component: Dashboard, meta: { requiresAuth: true }},
  { name: 'signIn', path: '/sign-in', component: SignIn },
  { name: 'signUp', path: '/sign-up', component: SignUp },
  { name: 'forgotPassword', path: '/forgot-password', component: ForgotPassword },
  { name: 'editor', path: '/project/:projectId/chart/:chartId', component: Editor, meta: { requiresAuth: true } },
  { name: 'profile', path: '/profile', component: Profile, meta: { requiresAuth: true }}
]


const router = new VueRouter({
  mode: 'history',
  routes
})

import {User} from '../resources/index'
import store from '../store/index'

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    User.current()
    .then(response => {
      store.dispatch('setApplicationLoaded')
      if (response.body) {
        store.dispatch('setCurrentUser', response.body)
        next()
      } else {
        next({
          name: 'signIn',
          query: { redirect: to.fullPath }
        })
      }

    })
  } else {
    store.dispatch('setApplicationLoaded')
    next()
  }
})

export default router