const store = {
  namespaced: true,
  state: {
    active: null,
  },
  mutations: {
    setActive (state, project) {
      state.active = project
    }
  },
  actions: {
    setActive ({ commit }, project) {
      commit('setActive', project)
    }
  },
  getters: {
    getActive: state => {
      return state.active
    }
  }
}

export default store