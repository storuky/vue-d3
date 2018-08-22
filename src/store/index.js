import Vue from 'vue'
import Vuex from 'vuex'
import objects from './objects'
import curves from './curves'
import chart from './chart'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    objects,
    curves,
    chart
  }
})

export default store