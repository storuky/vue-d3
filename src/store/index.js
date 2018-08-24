import Vue from 'vue'
import Vuex from 'vuex'
import objects from './objects'
import curves from './curves'
import chart from './chart'
import application from './application'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    objects,
    curves,
    chart,
    application
  }
})

export default store