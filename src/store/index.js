import Vue from 'vue'
import Vuex from 'vuex'
import objects from './objects'
import curves from './curves'
import chart from './chart'
import user from './user'
import project from './project'
import application from './application'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    objects,
    curves,
    chart,
    project,
    application,
    user
  }
})

export default store