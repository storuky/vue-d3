import settings from '../components/Grid/settings'

const store = {
  state: {
    objectsList: [
      // { id: 1, type: "Person", position: { x: 0, y: 0 }, size: { width: 100, height: 100 }, info: { title: "Vue.JS 2" } },
      // { id: 2, type: "General", position: { x: 250, y: 0 }, size: { width: 100, height: 100 }, info: { title: "Product" } },
      // { id: 2, type: "General", position: { x: 250, y: 0 }, size: { width: 100, height: 100 }, info: { title: "SVG" } },
      // { id: 3, type: "Organisation", position: { x: 200, y: 150 }, size: { width: 100, height: 100 }, info: {title: "Merge"} },
      // { id: 4, type: "Person", position: { x: 500, y: 0 }, size: { width: 100, height: 100 }, info: {title: "D3.JS 5"} },
      // { id: 5, type: "Person", position: { x: 1000, y: 0 }, size: { width: 100, height: 100 }, info: {title: "Webpack 4"} },
    ],
    objectsComponentsList: {}
  },
  mutations: {
    addObject(state, objectComponent) {
      state.objectsComponentsList[objectComponent.data.id] = objectComponent
    },
    setObjectsList(state, objectsList) {
      state.objectsList = objectsList
    },
    createObject(state, {object, fn}) {
      object.id = Math.floor(Math.random() * 10000000)

      const _object = settings[object.type].default(object)
      state.objectsList.push(_object)
      fn(_object)
    },
    removeObject(state, objectId) {
      state.objectsList = state.objectsList.filter(object => object.id != objectId)
    }
  },
  actions: {
    addObject({ commit, state }, objectComponent) {
      commit('addObject', objectComponent)
    },
    setObjectsList ({commit, state}, objects) {
      commit('setObjectsList', objects)
    },
    createObject ({commit, state}, object) {
      return new Promise((resolve, reject) => {
        commit('createObject', {
          object,
          fn: (_object) => {
            resolve(_object)
          }
        })
      })
    },
    removeObject ({commit}, objectId) {
      commit('removeObject', objectId)
      commit('removeCurves', objectId, {root: true})
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