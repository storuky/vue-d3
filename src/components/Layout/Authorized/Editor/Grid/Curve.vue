<template>
  <g>
    <defs>
      <linearGradient :id="`linear_gradient_from_${from}_to${to}`" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" v-bind="{'stop-color': fromColor}"/>
        <stop offset="100%" v-bind="{'stop-color': toColor}"/>
      </linearGradient>
    </defs>
    <path ref="path" v-bind="pathAttributes"></path>
  </g>
</template>

<script>
  import * as d3 from 'd3'
  import settings from './settings'

  export default {
    name: 'Curve',
    props: {
      drawingCurve: Object,
      from: Number,
      to: Number
    },
    mounted () {
      this.d3path = d3.select(this.$refs.path)
      this.$nextTick(function() {
        this.d3path.on('click', () => {
          this.remove()
        })

        this.redraw()

        this.$root.$on(`redrawCurve-${this.params.id}`, (params) => {
          this.redraw(params)
        })
      })

    },
    data () {
      return {
        lineGenerator: d3.line().curve(d3.curveBundle),
        pathAttributes : {
          'marker-end': this.drawingCurve ? 'url(#arrow)' : '',
          'stroke': `url(#linear_gradient_from_${this.from}_to${this.to})`
        },
        settings
      }
    },
    computed: {
      fromColor () {
        const object = this.getObject(this.params.from)
        return this.settings[object.type].outColor || '#605da5'
      },
      toColor () {
        const object = this.getObject(this.params.to)
        return object ? this.settings[object.type].inColor || '#df4e9e' : '#df4e9e'
      },
      params () {
        return this.drawingCurve || this.$store.getters['curves/getCurve']({from: this.from, to: this.to})
      }
    },
    methods: {
      getObject (objectId) {
        return this.$store.getters['objects/getObject'](objectId)
      },
      clear () {
        this.d3path.attr('d', this.lineGenerator([]))
      },
      remove () {
        this.$store.dispatch('curves/delete', {from: this.params.from, to: this.params.to})
      },
      setFrom (from) {
        this.params.from = from
      },
      setTo (to) {
        this.params.to = to
      },
      redraw (targetForCurve = {}) {
        let x1, x2, y1, y2
        if (this.params.to || targetForCurve.to) {
          var position = this.$store.getters['objects/getPoints']({from: this.params.from, to: targetForCurve.to || this.params.to})
          
          x1 = position.x1
          x2 = position.x2
          y1 = position.y1
          y2 = position.y2
  
        } else {
          if (isNaN(targetForCurve.x) || isNaN(targetForCurve.y)) return []
          var position = this.$store.getters['objects/getPoints']({from: this.params.from})

          x1 = position.x
          y1 = position.y
          x2 = targetForCurve.x
          y2 = targetForCurve.y
        }
        if (!isNaN(x1 && y1 && x2 && y2)) {
          const dx = x2 - x1 || 0.1,
                dy = y2 - y1 || 0.1
          var points = [
            [x1, y1],
            [dx/4 + x1, y1],
            [dx/2+x1, dy/2+y1],
            [x2 - dx/4, y2],
            [x2, y2],
          ]

          this.d3path.attr('d', this.lineGenerator(points))
        }
        return [[1,2]]
      }
    }
  }
</script>

<style scoped>
  path {
    fill: none;
    stroke-width: 5px;
    cursor: pointer;
  }
</style>
