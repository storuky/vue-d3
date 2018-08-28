import { User } from '../resources'
import store from '../store'

const checkAuth = (router) => {
  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      User.current()
        .then(response => {
          store.dispatch('application/setLoaded')
          if (response.body) {
            store.dispatch('user/setCurrent', response.body)
            next()
          } else {
            next({
              name: 'signIn',
              query: { redirect: to.fullPath }
            })
          }
        })
    } else {
      store.dispatch('application/setLoaded')
      next()
    }
  })
}

export default checkAuth