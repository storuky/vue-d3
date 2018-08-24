const store = {
  state: {
    drawer: false
  },
  mutations: {
    toggleDrawer(state) {
      state.drawer = !this.state.drawer
    },
    setDrawer(state, val) {
      state.drawer = val
    }
  },
  actions: {
    toggleDrawer({ commit }) {
      commit('toggleDrawer')
    },
    setDrawer({ commit }, val) {
      commit('setDrawer', val)
    },
  },
  getters: {
    getDrawer: (state) => () => {
      return state.drawer
    }
  }
}

export default store