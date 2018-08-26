<template>
  <div class="grid">
    <svg ref="svg">
      <defs>
        <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stop-color="#505fa6"/>
          <stop offset="100%" stop-color="#e44e9d"/>
        </linearGradient>
        <marker id="arrow" viewBox="0 -5 10 10" refX="5" refY="0" markerWidth="4" markerHeight="4" orient="auto">
          <path fill="#e44e9d" d="M0,-5L10,0L0,5" class="arrowHead"></path>
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
import Curve from './Grid/Curve'
import BaseObject from './Grid/Object'
import settings from './Grid/settings'

import debounce from '../../../../utils'
import {Chart} from '../../../../resources/index'

export default {
  name: 'Grid',
  props: {
    transform: Object
  },
  mounted () {
    this.d3svg = d3.select(this.$refs.svg)
    this.d3container = d3.select(this.$refs.container)

    this.$nextTick(function () {
      this.setTransform()
      this.enablePanAndZoomMode()
    })
  },
  components: {
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
    setTransform () {
      this.d3container.attr('transform', [
        'translate('+[this.transform.x, this.transform.y]+')',
        'scale('+this.transform.k+')'
      ])
    },
    sync: debounce(function () {
      const translate = this.$store.getters.getChartTranslate(),
            scale = this.$store.getters.getChartScale()
      Chart.update({
        id: this.$store.getters.getActiveChart.id
      },{
        chart: {
          options: {
            transform: {...translate, k: scale}
          }
        }
      })
    }, 500),
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
        this.sync()
      })

      this.d3svg
        .call(zoom)
        .call(
          zoom.transform,
          d3.zoomIdentity
            .translate(this.transform.x, this.transform.y)
            .scale(this.transform.k)
        )

      this.d3svg.on("dblclick.zoom", null)

      this.d3svg.on('dblclick', () => {
        d3.event.stopPropagation()
        d3.event.preventDefault()

        const translate = this.$store.getters.getChartTranslate(),
              scale = this.$store.getters.getChartScale()

        const components = settings.components[this.$store.getters.getActiveProject.type]
        const objectParams = {
          type: "ComponentSelector",
          position: {
            x: (d3.event.x - translate.x)/scale,
            y: (d3.event.y - translate.y - 100)/scale
          },
          info: {settings: {components}}
        }

        this.$store.dispatch("createObject", objectParams)
      })

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
