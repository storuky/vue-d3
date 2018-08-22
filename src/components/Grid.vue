<template>
  <div class="grid">
    <GridControls />
    <svg ref="svg">
      <defs>
        <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stop-color="#05a"/>
          <stop offset="100%" stop-color="#0a5"/>
        </linearGradient>
        <marker id="arrow" viewBox="0 -5 10 10" refX="5" refY="0" markerWidth="4" markerHeight="4" orient="auto">
          <path fill="#00a956" d="M0,-5L10,0L0,5" class="arrowHead"></path>
        </marker>
      </defs>
      <g ref="container">
        <g id="curves">
          <Curve v-for="connection in connections" :key="connection.id" :from="connection.from" :to="connection.to" />
        </g>
        <g id="objects">
          <BaseObject :data="object" v-for="object in objects" :key="object.id"></BaseObject>
        </g>
        <g id="drawingCurve">
          <Curve virtual="true" />
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import * as d3 from 'd3'
import GridControls from './GridControls'
import Curve from './Curve/Curve'
import BaseObject from './Objects/_Base'

export default {
  name: 'Grid',
  props: {
    transform: {
      type: Object,
      default: function () {
        return {x: 0, y: 0, k: 1}
      }
    }
  },
  created () {
    this.$store.dispatch('fetchObjectsList').then(res => {
      this.$store.dispatch('fetchCurvesList')
    })
  },
  mounted () {
    this.d3svg = d3.select(this.$refs.svg)
    this.d3container = d3.select(this.$refs.container)

    this.$nextTick(function () {
      this.d3container.attr('transform', [
        'translate('+[this.transform.x, this.transform.y]+')',
        'scale('+this.transform.k+')'
      ])

      this.enablePanAndZoomMode()
    })
  },
  components: {
    GridControls,
    BaseObject,
    Curve
  },
  computed: {
    objects () {
      return this.$store.getters.getObjectsList()
    },
    connections () {
      return this.$store.getters.getCurvesList()
    }
  },
  data () {
    return {
      mode: 'zoom'
    }
  },
  methods: {
    enablePanAndZoomMode () {
      // Clear
      this.d3svg
        .on('.zoom', null)
        .on('.dragstart', null)
        .on('.drag', null)
        .on('.dragend', null)
        .on('dblclick.zoom', null)

      // Add
      let zoom = d3.zoom().on('zoom', () => {
        this.d3container.attr('transform', d3.event.transform)
        this.$store.dispatch('setScale', d3.event.transform.k)
        this.$store.dispatch('setTranslate', {
          x: d3.event.transform.x,
          y: d3.event.transform.y
        })
      })
      this.d3svg
        .call(zoom)
        .call(
          zoom.transform,
          d3.zoomIdentity
            .translate(this.transform.x, this.transform.y)
            .scale(this.transform.k)
        )

      this.mode = 'zoom'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .grid {
    position: absolute;
    background: white;
  }

  .grid, .grid svg {
    width: 100%;
    height: 100%;
  }

  .grid svg {
    user-select: none;
  }
</style>
