const store = {
  state: {
    scale: 1,
    translate: {
      x: 0,
      y: 0
    }
  },
  mutations: {
    setScale (state, scale) {
      state.scale = scale
    },
    setTranslate (state, translate) {
      state.translate = translate
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
    }
  }
}

export default store