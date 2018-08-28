const store = {
  namespaced: true,
  state: {
    loaded: false
  },
  mutations: {
    setLoaded (state) {
      state.loaded = true
    }
  },
  actions: {
    setLoaded ({commit}) {
      commit('setLoaded')
    }
  },
  getters: {
    isLoaded: (state) => {
      return state.loaded
    }
  }
}

export default store