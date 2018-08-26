import { Connection } from '../resources/index'


const store = {
  state: {
    curvesList: [
      // {from: 1, to: 2, id: 1},
      // {from: 2, to: 4, id: 2},
      // {from: 1, to: 3, id: 3},
    ],
    curvesComponentsList: {},
    drawingCurve: null
  },
  mutations: {
    addCurve(state, curve) {
      ["from", "to"].forEach(type => {
        const curves = state.curvesComponentsList[`${type}-${curve[type]}`]
        if (curves) {
          curves.push(curve)
        } else {
          state.curvesComponentsList[`${type}-${curve[type]}`] = [curve]
        }
      })
    },
    createCurve(state, curve) {
      state.curvesList.push(curve)
    },
    removeCurve(state, { from, to }) {
      state.curvesList = state.curvesList.filter(el => !(el.from == from && el.to == to))
    },
    removeCurves(state, objectid) {
      state.curvesList = state.curvesList.filter(el => !(el.from == objectid || el.to == objectid))
    },
    setDrawingCurve(state, curve) {
      state.drawingCurve = curve
    },
    setCurvesList(state, curvesList) {
      state.curvesList = curvesList
    }
  },
  actions: {
    addCurve({ commit, state }, curve) {
      commit('addCurve', curve)
    },
    createCurve({ commit, rootGetters}, {from, to, callback}) {
      const params = { connection: { from, to } }
      Connection.save(params)
        .then(response => {
          commit('createCurve', response.body)
        })
    },
    removeCurve({commit, state}, {from, to}) {
      const params = {connection: { from, to } }

      Connection.delete({id: 0}, params)
        .then(() => {
          commit('removeCurve', {from, to})
        })
    },
    setDrawingCurve({ commit, state }, curve) {
      commit('setDrawingCurve', curve)
    }
  },
  getters: {
    getCurve: state => ({from, to}) => {
      const curvesFrom = state.curvesComponentsList[`from-${from}`] || [],
            curvesTo = state.curvesComponentsList[`to-${to}`] || []
      const curve = curvesFrom
                      .concat(curvesTo)
                      .find(curve => curve.fromLocal == from && curve.toLocal == to)
      return curve
    },
    getCurves: state => objectId => {
      const from = state.curvesComponentsList[`from-${objectId}`] || [],
            to = state.curvesComponentsList[`to-${objectId}`] || []

      return from.concat(to)
    },
    getCurvesList: state => () => {
      return state.curvesList
    },
    getDrawingCurve: state => () => {
      return state.drawingCurve
    },
  }
}

export default store