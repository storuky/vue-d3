import Vue from 'vue'

const store = {
  state: {
    scale: 1,
    translate: {
      x: 0,
      y: 0
    },
    activeChart: null
  },
  mutations: {
    setScale (state, scale) {
      state.scale = scale
    },
    setTranslate (state, translate) {
      state.translate = translate
    },
    setChart (state, chart) {
      state.activeChart = chart
    }
  },
  actions: {
    setScale ({commit, state}, scale) {
      commit('setScale', scale)
    },
    setTranslate ({commit, state}, translate) {
      commit('setTranslate', translate)
    },
    fetchChart({ commit, state }, chartId = '7fad6b0a-0d62-497c-8b0a-637792ddd220') {
      Vue.http.get(`/vulcan/v1/charts/${chartId}`)
        .then(response => {
          commit('setChart', response.body)
          commit('setObjectsList', response.body.objects, {root: true})
          commit('setCurvesList', response.body.connections, {root: true})
        })
    }
  },
  getters: {
    getChartScale: state => () => {
      return state.scale
    },
    getChartTranslate: state => () => {
      return state.translate
    },
    getActiveChart: state => {
      return state.activeChart
    }
  }
}

export default store