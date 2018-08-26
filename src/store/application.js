const store = {
  state: {
    drawer: false,
    applicationLoaded: false
  },
  mutations: {
    toggleDrawer(state) {
      state.drawer = !this.state.drawer
    },
    setDrawer(state, val) {
      state.drawer = val
    },
    setApplicationLoaded(state) {
      state.applicationLoaded = true
    }
  },
  actions: {
    toggleDrawer({ commit }) {
      commit('toggleDrawer')
    },
    setDrawer({ commit }, val) {
      commit('setDrawer', val)
    },
    setApplicationLoaded({commit}) {
      commit('setApplicationLoaded')
    }
  },
  getters: {
    getDrawer: (state) => () => {
      return state.drawer
    },
    getApplicationLoaded: (state) => {
      return state.applicationLoaded
    }
  }
}

export default store