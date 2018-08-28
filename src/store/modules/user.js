const store = {
  namespaced: true,
  state: {
    current: null
  },
  mutations: {
    setCurrent (state, user) {
      state.current = user
    }
  },
  actions: {
    setCurrent ({ commit }, user) {
      commit('setCurrent', user)
    }
  },
  getters: {
    getCurrent: state => {
      return state.current
    }
  }
}

export default store