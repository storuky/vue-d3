import settings from '../../components/Layout/Authorized/Editor/Grid/settings'
import { CharObject } from '../../resources'


const store = {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    add (state, object) {
      state.list.push(object)
    },
    delete (state, objectId) {
      state.list = state.list.filter(object => object.id != objectId)
    },
    removeAll (state) {
      state.list = []
    }
  },
  actions: {
    create({ commit, state, rootGetters}, objectParams) {
      const newObjectParams = settings[objectParams.type].default(objectParams)
      return new Promise(resolve => {
        CharObject.save({
          chart_id: rootGetters['chart/getActive'].id,
          object: newObjectParams
        }).then(res => resolve(res.body))
      }).then(object => {
        commit('add', object)
        return object
      })
    },
    add({ commit }, objectParams) {
      commit('add', objectParams)
    },
    delete ({ commit, dispatch, rootGetters }, objectId) {
      CharObject.delete({ id: objectId })
      commit('delete', objectId)
      rootGetters['curves/getCurves'](objectId).forEach(curve => dispatch('curves/delete', curve, {root: true}))
    }
  },
  getters: {
    getObject: state => objectId => {
      return state.list.find(object => object.id == objectId)
    },
    getList: state => () => {
      return state.list
    },
    getPoints: state => ({from, to}) => {
      const fromObject = state.list.find(object => object.id == from),
            toObject = state.list.find(object => object.id == to)

      const position = {
        from: fromObject ? fromObject.position : null,
        to: toObject ? toObject.position : null
      }

      if (from && to) {
        return {
          x1: position.from.x + fromObject.size.width - 2,
          y1: position.from.y + fromObject.size.height / 2 - 4,
          x2: position.to.x - 2,
          y2: position.to.y + toObject.size.height / 2 - 4
        }
      } else if (from) {
        return {
          x: position.from.x + fromObject.size.width - 2,
          y: position.from.y + fromObject.size.height / 2 - 4
        }
      }
    }
  }
}

export default store