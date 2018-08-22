<template>
  <path v-bind="pathAttributes" stroke="url(#linear)"></path>
</template>

<script>
  import * as d3 from 'd3'

  export default {
    name: 'Curve',
    props: {
      from: Number,
      to: Number,
      virtual: String
    },
    created () {
      if (this.$props.virtual) {
        this.$store.dispatch('setDrawingCurve', this)
      } else {
        this.$store.dispatch('addCurve', this)
      }
    },
    mounted () {
      this.d3path = d3.select(this.$el)
      this.$nextTick(function() {
        this.redraw()
        this.d3path.on('click', () => {
          this.remove()
        })
      })
    },
    data () {
      return {
        lineGenerator: d3.line().curve(d3.curveBundle),
        fromLocal: this.from,
        toLocal: this.to,
        pathAttributes : {
          'marker-end': this.virtual ? 'url(#arrow)' : ''
        }
      }
    },
    methods: {
      clear () {
        this.d3path.attr('d', this.lineGenerator([]))
      },
      remove () {
        this.$store.dispatch('removeCurve', {from: this.fromLocal, to: this.toLocal})
      },
      setFrom (from) {
        this.fromLocal = from
      },
      redraw (targetPosition) {
        if (this.fromLocal && this.toLocal) {
          var position = this.$store.getters.getPoints({from: this.fromLocal, to: this.toLocal})
          var x1 = position.x1,
              x2 = position.x2,
              y1 = position.y1,
              y2 = position.y2
  
        } else if (this.fromLocal && !this.toLocal && targetPosition) {
          var position = this.$store.getters.getPoints({from: this.fromLocal})
          var object = this.$store.getters.getObjectComponent(this.fromLocal)

          var x1 = position.x,
              y1 = position.y,
              x2 = targetPosition.x,
              y2 = targetPosition.y
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
      }
    },
    destroyed () {
      
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
