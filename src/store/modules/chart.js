const store = {
  namespaced: true,
  state: {
    active: null
  },
  mutations: {
    setScale (state, scale) {
      if (state.active.options && state.active.options.transform) {
        state.active.options.transform.k = scale
      } else {
        state.active.options = state.active.options || {}
        state.active.options.transform = {k: 1}
      }
    },
    setTranslate (state, translate) {
      if (state.active.options && state.active.options.transform) {
        state.active.options.transform.x = translate.x
        state.active.options.transform.y = translate.y
      } else {
        state.active.options = state.active.options || {}
        state.active.options.transform = {x: 0, y: 0}
      }
    },
    setActive (state, chart) {
      state.active = chart
    }
  },
  actions: {
    setScale ({ commit }, scale) {
      commit('setScale', scale)
    },
    setTranslate ({ commit }, translate) {
      commit('setTranslate', translate)
    },
    setActive ({commit}, chart) {
      commit('setActive', chart)
      commit('objects/removeAll', {}, { root: true })
      commit('curves/removeAll', {}, { root: true })
      chart.objects.forEach(object => {
        commit('objects/add', object, {root: true})
      })
      chart.connections.forEach(curve => {
        commit('curves/add', curve, {root: true})
      })
    }
  },
  getters: {
    getScale: state => () => {
      if (state.active.options && state.active.options.transform) {
        return state.active.options.transform.k
      } else {
        return 1
      }
    },
    getTranslate: state => () => {
      if (state.active.options && state.active.options.transform) {
        return {x: state.active.options.transform.x, y: state.active.options.transform.y}
      } else {
        return {x: 0, y: 0}
      }
    },
    getActive: state => {
      return state.active
    },
    getTransform: state => {
      if (state.active) {
        return state.active.options.transform
      }
    }
  }
}

export default store