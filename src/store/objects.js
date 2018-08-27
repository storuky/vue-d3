import settings from '../components/Layout/Authorized/Editor/Grid/settings'
import { CharObject } from '../resources/index'


const store = {
  state: {
    objectsList: [],
    objectsComponentsList: {}
  },
  mutations: {
    addObject(state, objectComponent) {
      state.objectsComponentsList[objectComponent.localData.id] = objectComponent
    },
    setObjectsList(state, objectsList) {
      state.objectsList = objectsList
    },
    createObject(state, object) {
      state.objectsList.push(object)
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
    createObject({ commit, state, rootGetters}, objectParams) {
      const newObjectParams = settings[objectParams.type].default(objectParams)
      return new Promise(resolve => {
        CharObject.save({ chart_id: rootGetters.getActiveChart.id, object: newObjectParams}).then(res => {
          resolve(res.body)
        })
      }).then(object => {
        commit('createObject', object)
        return object
      })
    },
    removeObject ({commit}, objectId) {
      CharObject.delete({ id: objectId })
      commit('removeObject', objectId)
      commit('removeCurves', objectId, {root: true})
    }
  },
  getters: {
    getObjectComponent: state => id => {
      return state.objectsComponentsList[id]
    },
    getObject: state => id => {
      return state.objectsComponentsList[id].data
    },
    getObjectsList: state => () => {
      return state.objectsList
    },
    getPoints: state => ({from, to}) => {
      const fromObject = state.objectsComponentsList[from],
            toObject = state.objectsComponentsList[to]

      const fromObjectPosition = fromObject ? fromObject.localData.position : null,
      toObjectPosition = toObject ? toObject.localData.position : null

      if (from && to) {
        return {
          x1: fromObjectPosition.x + fromObject.localData.size.width - 2,
          y1: fromObjectPosition.y + fromObject.localData.size.height / 2 -2,
          x2: toObjectPosition.x - 2,
          y2: toObjectPosition.y + toObject.localData.size.height / 2 -2
        }
      } else if (from) {
        return {
          x: fromObjectPosition.x + fromObject.localData.size.width - 2,
          y: fromObjectPosition.y + fromObject.localData.size.height / 2 -2
        }
      }
    }
  }
}

export default store