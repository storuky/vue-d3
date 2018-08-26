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
    },
    getChartTransform: state => {
      if (state.activeChart) {
        return state.activeChart.options.transform
      }
    }
  }
}

export default store