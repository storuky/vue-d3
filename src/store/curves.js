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
    createCurve(state, { from, to }) {
      state.curvesList.push({ id: parseInt(Math.random() * 10000), from, to })
    },
    removeCurve(state, { from, to }) {
      state.curvesList = state.curvesList.filter(el => !(el.from == from && el.to == to))
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
    createCurve({commit, state}, {from, to}) {
      commit('createCurve', {from, to})
    },
    removeCurve({commit, state}, {from, to}) {
      commit('removeCurve', {from, to})
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