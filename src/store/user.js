const store = {
  state: {
    currentUser: null
  },
  mutations: {
    setCurrentUser (state, user) {
      state.currentUser = user
    }
  },
  actions: {
    setCurrentUser({commit}, user) {
      commit('setCurrentUser', user)
    }
  },
  getters: {
    getCurrentUser: state => {
      return state.currentUser
    }
  }
}

export default store