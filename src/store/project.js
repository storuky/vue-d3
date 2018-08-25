import { Project } from '../resources/index'

const store = {
  state: {
    activeProject: {},
  },
  mutations: {
    setActiveProject (state, project) {
      state.activeProject = project
    }
  },
  actions: {
    setActiveProject({commit}, project) {
      commit('setActiveProject', project)
    },
    fetchProject({ commit, state }, projectId = '7fad6b0a-0d62-497c-8b0a-637792ddd220') {
      Project.get({ id: projectId})
        .then(response => {
          commit('setActiveProject', response.body)
        })
    }
  },
  getters: {
    getActiveProject: state => {
      return state.activeProject
    }
  }
}

export default store