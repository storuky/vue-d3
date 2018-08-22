import Vue from 'vue'

const store = {
  state: {
    objectsList: [
      // { id: 1, type: "Person", position: { x: 0, y: 0 }, size: { width: 100, height: 100 }, info: { title: "" } },
      // { id: 2, type: "Person", position: { x: 250, y: 0 }, size: { width: 100, height: 100 }, info: { title: "" } },
      // // { id: 3, type: "General", position: { x: 200, y: 150 }, size: { width: 100, height: 100 }, info: {} },
      // { id: 4, type: "Person", position: { x: 500, y: 0 }, size: { width: 100, height: 100 }, info: {title: ""} },
      // { id: 5, type: "Person", position: { x: 1000, y: 0 }, size: { width: 100, height: 100 }, info: {title: ""} },
    ],
    objectsComponentsList: {}
  },
  mutations: {
    addObject(state, objectComponent) {
      state.objectsComponentsList[objectComponent.data.id] = objectComponent
    },
    setObjectsList(state, objectsList) {
      state.objectsList = objectsList
    }
  },
  actions: {
    addObject({ commit, state }, objectComponent) {
      commit('addObject', objectComponent)
    },
    fetchObjectsList ({commit, state}) {
      Vue.http.get("/vulcan/v1/chart_objects.json", { params: { chart_id: 'bb2e168b-f66b-4152-b23f-4706f884e0c5'}})
      .then(objects => {
        commit('setObjectsList', objects.body)
      })
    }
  },
  getters: {
    getObjectComponent: state => id => {
      return state.objectsComponentsList[id]
    },
    getObjectsList: state => () => {
      return state.objectsList
    },
    getPoints: state => ({from, to}) => {
      const fromObject = state.objectsComponentsList[from],
            toObject = state.objectsComponentsList[to]

      const fromObjectPosition = fromObject ? fromObject.data.position : null,
      toObjectPosition = toObject ? toObject.data.position : null

      if (from && to) {
        return {
          x1: fromObjectPosition.x + fromObject.data.size.width,
          y1: fromObjectPosition.y + fromObject.data.size.height / 2,
          x2: toObjectPosition.x,
          y2: toObjectPosition.y + toObject.data.size.height / 2
        }
      } else if (from) {
        return {
          x: fromObjectPosition.x + fromObject.data.size.width,
          y: fromObjectPosition.y + fromObject.data.size.height / 2
        }
      }
    }
  }
}

export default store