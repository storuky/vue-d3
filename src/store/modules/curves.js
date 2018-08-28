import { Connection } from '../../resources'

const store = {
  namespaced: true,
  state: {
    list: [],
    drawingCurve: null
  },
  mutations: {
    add (state, curve) {
      state.list.push(curve)
    },
    remove (state, { from, to }) {
      state.list = state.list.filter(el => !(el.from == from && el.to == to))
    },
    initDrawingCurve (state, { from, position }) {
      state.drawingCurve = {
        from,
        id: Math.random(),
        position: {
          x1: position.x,
          y1: position.y
        }
      }
    },
    setTargetForDrawingCurve (state, targetPosition) {
      state.drawingCurve.position.x2 = targetPosition.x
      state.drawingCurve.position.y2 = targetPosition.y
    },
    deleteDrawingCurve (state) {
      state.drawingCurve = null
    },
    removeAll (state) {
      state.list = []
    }
  },
  actions: {
    add ({ commit }, { from, to }) {
      commit('add', { from, to, id: Math.random() })
    },
    create({ commit }, { from, to, callback }) {
      Connection
        .save({connection: { from, to }})
        .then(response => {
          if (callback) callback()
          commit('add', response.body)
        })
    },
    initDrawingCurve ({ commit }, { from, position }) {
      commit('initDrawingCurve', { from, position })
    },
    setTargetForDrawingCurve ({ commit }, targetPosition) {
      commit('setTargetForDrawingCurve', targetPosition)
    },
    delete ({ commit }, { from, to }) {
      const params = {connection: { from, to } }
      commit('remove', { from, to })
      Connection.delete({id: 0}, params)
    },
    remove ({ commit }, { from, to }) {
      commit('remove', { from, to })
    },
    deleteDrawingCurve ({commit}) {
      commit('deleteDrawingCurve')
    }
  },
  getters: {
    getCurve: state => ({from, to}) => {
      return state.list.find(curve => curve.from == from && curve.to == to)
    },
    getList: state => () => {
      return state.list
    },
    getCurves: state => (objectId) => {
      return state.list.filter(curve => curve.from == objectId || curve.to == objectId)
    },
    getDrawingCurve: state => {
      return state.drawingCurve
    },
    getCurvesTo: state => (objectId) => {
      return state.list.filter(curve => curve.to == objectId)
    }
  }
}

export default store