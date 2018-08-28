<template>
  <g ref="container" :data-object-id="params.id" @mouseover="showTools()" @mouseleave="hideTools()">
    <!-- Object -->
    <foreignObject :height="params.size.height" :width="params.size.width" ref="foreignObject">
        <component ref="component" @calcSize="calcSize()" :default="settings.size" :is="params.type" v-model="params.info.settings" :componentId="params.id" :size="params.size" :position="params.position"></component>
      <!-- <div style="margin: 4px; width: calc(100% - 8px); height: calc(100% - 8px)" ref="content">
      </div> -->
    </foreignObject>

    <!-- Tools -->
    <foreignObject v-if="toolsVisible" y="-30" height="30" :width="params.size.width">
      <ObjectTools :settings="settings" @openSettings="openSettings" @deleteObject="deleteObject" :objectId="params.id" />
    </foreignObject>

    <!-- Label -->
    <foreignObject ref="labelFO" :height="$refs.label ? $refs.label.scrollHeight : 30" :width="params.size.width + 50" :x="-25" :y="params.size.height+20">
      <div class="object-label" ref="label">
        {{params.info.settings.title || params.info.title || componentName}}
      </div>
    </foreignObject>

    <!-- IN -->
    <foreignObject v-if="hasIn" height="12" :width="12" x="-4" :y="params.size.height/2 - 6">
      <In :color="settings.inColor" />
    </foreignObject>

    <!-- OUT -->
    <foreignObject v-if="settings.has.out" height="12" :width="12" :x="params.size.width - 8" :y="params.size.height/2 - 6">
      <Out :color="settings.outColor" :objectId="params.id" />
    </foreignObject>

    <!-- RESIZER -->
    <foreignObject v-if="settings.has.resize" width="10" height="10" :x="params.size.width-8" :y="params.size.height-8">
      <Resizer :objectId="params.id" />
    </foreignObject>

    <!-- <Curve v-for="curve in curvesTo" :key="curve.id" :from="curve.from" :to="curve.to" /> -->
  </g>
</template>

<script>
  import './Objects/_Elements/in-out.css'

  import * as d3 from 'd3'

  import ComponentSelector from './Objects/ComponentsSelector/Component'

  // AnalysisTools
  import AnalysisTools_Person from './Plugins/AnalysisTools/Objects/Person/Component'
  import AnalysisTools_Organisation from './Plugins/AnalysisTools/Objects/Organisation/Component'
  import AnalysisTools_General from './Plugins/AnalysisTools/Objects/General/Component'

  // Chatbot
  import Chatbot_Question from './Plugins/Chatbot/Objects/Question/Component'
  import Chatbot_Answer from './Plugins/Chatbot/Objects/Answer/Component'
  import Chatbot_DialogFlow from './Plugins/Chatbot/Objects/DialogFlow/Component'

  // Elements
  import In from './Objects/_Elements/In'
  import Out from './Objects/_Elements/Out'
  import Resizer from './Objects/_Elements/Resizer'
  import ObjectTools from './Objects/_Elements/ObjectTools'
  import Curve from './Curve'

  import settings from './settings'
  import debounce from '../../../../../utils'

  import { CharObject } from '../../../../../resources/index'
  
  export default {
    name: "BaseObject",
    props: {
      objectId: Number
    },
    components: {
      AnalysisTools_Person,
      AnalysisTools_Organisation,
      AnalysisTools_General,
      Chatbot_Answer,
      Chatbot_Question,
      Chatbot_DialogFlow,
      ComponentSelector,
      In,
      Out,
      Resizer,
      ObjectTools,
      Curve
    },
    mounted () {
      this.$nextTick(function () {
        this.d3container = d3.select(this.$refs.container)
        this.d3container.on('dblclick', () => d3.event.stopPropagation())

        this.$root.$on(`redrawObject-${this.objectId}`, () => {
          this.redraw()
        })

        this.arrange()
        this.makeDraggable()
        if (this.$refs.labelFO) {
          d3.select(this.$refs.labelFO).attr('height', this.$refs.label.scrollHeight)
        }

        this.calcSize()
      })
    },
    data () {
      return {
        drawingCurve: false,
        toolsVisible: false
      }
    },
    computed: {
      params () {
        return this.$store.getters['objects/getObject'](this.objectId)
      },
      settings () {
        return settings[this.params.type]
      },
      labelHeightByContent () {
        return this.$refs.label ? this.$refs.label.scrollHeight : this.initialLabelHeightByContent || 30
      },
      componentName () {
        return this.settings.name
      },
      curvesTo () {
        return this.$store.getters['curves/getCurvesTo'](this.params.id)
      },
      hasIn () {
        return this.settings.has.in && this.curvesTo.length
      }
    },
    methods: {
      showTools () {
        this.toolsVisible = true
      },
      hideTools () {
        this.toolsVisible = false
      },
      arrange () {
        this.d3container
          .attr("transform", "translate("+[this.params.position.x - 4, this.params.position.y - 4]+")")
      },
      setPosition (position) {
        this.params.position = position
        this.redraw()
      },
      redraw () {
        this.arrange()
        this.curves().forEach(curve => {
          this.$root.$emit(`redrawCurve-${curve.id}`)
        })
        this.sync()
      },
      curves () {
        return this.$store.getters['curves/getCurves'](this.params.id)
      },
      calcSize() {
        this.$nextTick(function () {
          this.params.size.width = this.$refs.component.$el.scrollWidth
          this.params.size.height = this.$refs.component.$el.scrollHeight
          this.redraw()
        })
      },
      deleteObject () {
        this.$store.dispatch('objects/delete', this.params.id)
      },
      openSettings () {
        const openSettingsCallback = this.$refs.component.openSettings
        if (openSettingsCallback) openSettingsCallback()
      },
      sync: debounce(function () {
        if (!settings[this.params.type].disableSync) {
          CharObject.update({id: this.params.id}, {object: this.params})
        }
      }, 500),
      makeDraggable () {
        this.d3container.call(
          d3.drag()
            .on("start", () => {
              this.initialPosition = {
                x: d3.event.x - this.params.position.x,
                y: d3.event.y - this.params.position.y
              }
            })
            .on("drag", () => {
              var targetPosition = {
                x: d3.event.x - this.initialPosition.x,
                y: d3.event.y - this.initialPosition.y
              }
              this.setPosition(targetPosition)
            })
        )
      }
    }
  }
</script>

<style scoped>
  .object-label {
    text-transform: uppercase;
    font-size: 12px;
    text-align: center;
    word-wrap: break-word;
  }  
</style>
