<template>
  <div class="grid-wrapper">
    <div class="grid-help">
      <div v-if="objects.length == 0">Double-click to create an object</div>
      
    </div>
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
  </div>
</template>

<script>
import * as d3 from 'd3'
import Curve from './Grid/Curve'
import BaseObject from './Grid/Object'
import settings from './Grid/settings'

import debounce from '../../../../utils'
import {Chart} from '../../../../resources/index'
import GridUtils from './Grid/GridUtils'

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
      this.dragAndDrop()
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
    },
    dragAndDrop () {
      let node = this.$refs.svg

      node.addEventListener('dragover', function(e) {
        e.stopPropagation()
        e.preventDefault()
      })

      node.addEventListener('drop', (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (this.$store.getters.getActiveProject.type != "AnalysisTools") {
          return
        }

        const translate = this.$store.getters.getChartTranslate(),
              scale = this.$store.getters.getChartScale(),
              offset = {x: node.getBoundingClientRect().x, y: node.getBoundingClientRect().y}

        let text = e.dataTransfer.getData("text/html") || e.dataTransfer.getData("text"),
            objectId = (e.target.closest("g[data-object-id]") || {dataset: {}}).dataset.objectId

        text = text.replace('<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">', '')


        let position = {
              x: (e.x - offset.x - translate.x) / scale - settings.General.size.width/2,
              y: (e.y - offset.y  - translate.y) / scale - settings.General.size.height/2
            },
            isLink = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(text)

        if (/^\<a.*\>.*/i.test(text)) {
          isLink = true
          text = text.match(/href="([^"]*)/)[1]
        }

        if (objectId) {
          if (isLink) {
            if (GridUtils.youtubeId(text)) {
              GridUtils.addYoutube({objectId, text, position})
            } else {
              GridUtils.addCrawlerData({objectId, link: text, position})
            }
          } else {
            GridUtils.addNotes({objectId, text, position})
          }
        } else {
          if (isLink) {
            GridUtils.insertFromCrawler({link: text, position})
          } else {
            GridUtils.insertNotes({text, position})
          }
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .grid-wrapper {
    background: white;
  }

  .grid, .grid-wrapper {
    position: absolute;
  }

  .grid-wrapper, .grid, .grid svg {
    width: 100%;
    height: 100%;
  }

  .grid {
    z-index: 2;
    top: 0;
  }

  .grid-help {
    position: relative;
    z-index: 1;
    height: 100%;
    font-size: 20px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #565656;
  }

  .grid svg {
    user-select: none;
  }
</style>
