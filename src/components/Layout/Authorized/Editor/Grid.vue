<template>
  <div class="grid-wrapper">
    <div class="grid-help">
      <div v-if="objects.length == 0">Double-click to create an object</div>
      
    </div>
    <div class="grid">
      <svg ref="svg">
        <g ref="container">
          <g id="curves">
            <Curve v-for="connection in connections" :key="connection.id" :from="connection.from" :to="connection.to" />
          </g>
          <g id="objects">
            <BaseObject :objectId="object.id" v-for="object in objects" :key="object.id"></BaseObject>
          </g>
          <g id="drawingCurve" v-if="drawingCurve && drawingCurve.id">
            <marker id="arrow" viewBox="0 -5 10 10" refX="5" refY="0" markerWidth="4" markerHeight="4" orient="auto">
              <path fill="#e44e9d" d="M0,-5L10,0L0,5"></path>
            </marker>
            <Curve :drawingCurve="drawingCurve" />
          </g>
        </g>
      </svg>
    </div>
    <v-btn @click="createObject" color="primary" fab class="add-object-btn">
      <v-icon>add</v-icon>
    </v-btn>
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
  data () {
    return {

    }
  },
  computed: {
    activeChart () {
      return this.$store.getters['chart/getActive']
    },
    activeProject () {
      return this.$store.getters['project/getActive']
    },
    chartId () {
      return this.activeChart.id
    },
    objects () {
      return this.$store.getters['objects/getList']()
    },
    connections () {
      return this.$store.getters['curves/getList']()
    },
    translate: {
      get () {
        return this.$store.getters['chart/getTranslate']()
      },
      set (value) {
        this.$store.dispatch('chart/setTranslate', value)
      }
    },
    scale: {
      get () {
        return this.$store.getters['chart/getScale']()
      },
      set (value) {
        this.$store.dispatch('chart/setScale', value)
      }
    },
    drawingCurve () {
      return this.$store.getters['curves/getDrawingCurve']
    }
  },
  methods: {
    setTransform () {
      this.d3container.attr('transform', [
        'translate('+[this.translate.x, this.translate.y]+')',
        'scale('+this.scale+')'
      ])
    },
    sync: debounce(function () {
      const translate = this.$store.getters['chart/getTranslate'](),
            scale = this.$store.getters['chart/getScale']()
      Chart
        .update({
          id: this.activeChart.id
        },{
          chart: {
            options: {
              transform: {
                ...translate,
                k: scale
              }
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

        this.scale = d3.event.transform.k
        var translate = {
          x: d3.event.transform.x,
          y: d3.event.transform.y
        }

        this.translate = translate

        this.sync()
      })

      this.d3svg
        .call(zoom)
        .call(
          zoom.transform,
          d3.zoomIdentity
            .translate(this.translate.x, this.translate.y)
            .scale(this.scale)
        )

      this.d3svg.on("dblclick.zoom", null)
      this.d3svg.on('dblclick',() => this.createObject())
    },
    createObject () {
      if (d3.event) {
        d3.event.stopPropagation()
        d3.event.preventDefault()
      }
      
      const components = settings.components[this.activeProject.type],
            rect = this.$el.getBoundingClientRect()
      let position

      if (d3.event) {
        position = {
          x: (d3.event.x - this.translate.x -rect.x)/this.scale,
          y: (d3.event.y - 115 - this.translate.y)/this.scale
        }
      } else {
        position = {
          x: (-this.translate.x + rect.width / 2)/this.scale - 144,
          y: (-this.translate.y + (rect.height / 2))/this.scale - 25*components.length
        }
      }

      const objectParams = {
        type: "ComponentSelector",
        position,
        info: {
          settings: {
            components
          }
        }
      }

      this.$store.dispatch("objects/create", objectParams)
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

        if (this.$store.getters['project/getActive'].type != "AnalysisTools") {
          return
        }
        const rect = node.getBoundingClientRect()

        let text = e.dataTransfer.getData("text/html") || e.dataTransfer.getData("text"),
            objectId = (e.target.closest("g[data-object-id]") || {dataset: {}}).dataset.objectId

        text = text.replace('<meta http-equiv="Content-Type" content="text/html;charset=UTF-8">', '')


        let position = {
              x: (e.x - rect.x - this.translate.x) / this.scale - settings.AnalysisTools_General.size.width/2,
              y: (e.y - rect.y  - this.translate.y) / this.scale - settings.AnalysisTools_General.size.height/2
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

  .add-object-btn {
    position: fixed;
    z-index: 2;
    right: 50px;
    bottom: 30px;
  }
</style>
