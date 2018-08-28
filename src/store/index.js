import Vue from 'vue'
import Vuex from 'vuex'
import objects from './modules/objects'
import curves from './modules/curves'
import chart from './modules/chart'
import user from './modules/user'
import project from './modules/project'
import application from './modules/application'

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