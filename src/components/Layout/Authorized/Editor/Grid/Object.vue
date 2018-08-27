<template>
  <g ref="container" :data-object-id="localData.id" @mouseover="showTools()" @mouseleave="hideTools()">
    <!-- Object -->
    <foreignObject :height="localData.size.height" :width="localData.size.width" ref="foreignObject">
        <component ref="component" @calcSize="calcSize()" :default={defaultSize} :is="componentType" v-model="localData.info.settings" :componentId="localData.id" :size="localData.size" :position="localData.position"></component>
      <!-- <div style="margin: 4px; width: calc(100% - 8px); height: calc(100% - 8px)" ref="content">
      </div> -->
    </foreignObject>

    <!-- Tools -->
    <foreignObject v-if="toolsVisible" y="-30" height="30" :width="localData.size.width">
      <ObjectTools :settings="settings" @openSettings="openSettings" @deleteObject="deleteObject" :objectId="localData.id" />
    </foreignObject>

    <!-- Label -->
    <foreignObject ref="labelFO" :height="$refs.label ? $refs.label.scrollHeight : 30" :width="localData.size.width + 50" :x="-25" :y="localData.size.height+20">
      <div class="object-label" ref="label">
        {{localData.info.settings.title || localData.info.title || componentName}}
      </div>
    </foreignObject>

    <!-- IN -->
    <foreignObject v-if="settings.has.in" height="12" :width="12" x="-4" :y="localData.size.height/2 - 6">
      <In />
    </foreignObject>

    <!-- OUT -->
    <foreignObject v-if="settings.has.out" height="12" :width="12" :x="localData.size.width - 8" :y="localData.size.height/2 - 6">
      <Out :objectId="localData.id" />
    </foreignObject>

    <!-- RESIZER -->
    <foreignObject v-if="settings.has.resize" width="10" height="10" :x="localData.size.width-8" :y="localData.size.height-8">
      <Resizer :objectId="localData.id" />
    </foreignObject>
  </g>
</template>

<script>
  import './Objects/_Elements/in-out.css'

  import * as d3 from 'd3'

  import ComponentSelector from './Objects/ComponentsSelector/index'

  // AnalysisTools
  import AnalysisTools_Person from './Plugins/AnalysisTools/Objects/Person/index'
  import AnalysisTools_Organisation from './Plugins/AnalysisTools/Objects/Organisation/index'
  import AnalysisTools_General from './Plugins/AnalysisTools/Objects/General/index'

  // Chatbot
  import Chatbot_Question from './Plugins/Chatbot/Objects/Question/index'
  import Chatbot_Answer from './Plugins/Chatbot/Objects/Answer/index'

  // Elements
  import In from './Objects/_Elements/In'
  import Out from './Objects/_Elements/Out'
  import Resizer from './Objects/_Elements/Resizer'
  import ObjectTools from './Objects/_Elements/ObjectTools'

  import settings from './settings'
  import debounce from '../../../../../utils'

  import { CharObject } from '../../../../../resources/index'
  
  export default {
    name: "BaseObject",
    props: {
      data: Object
    },
    components: {
      AnalysisTools_Person,
      AnalysisTools_Organisation,
      AnalysisTools_General,
      Chatbot_Answer,
      Chatbot_Question,
      ComponentSelector,
      In,
      Out,
      Resizer,
      ObjectTools
    },
    created () {
      this.$store.dispatch("addObject", this)
    },
    mounted () {
      this.$nextTick(function () {
        this.d3container = d3.select(this.$refs.container)
        this.d3container.on('dblclick', () => d3.event.stopPropagation())
        this.arrange()
        this.makeDraggable()
        if (this.$refs.labelFO) {
          d3.select(this.$refs.labelFO).attr('height', this.$refs.label.scrollHeight)
        }

        // setTimeout(() => {
          this.calcSize()
        // }, 1000)
      })
    },
    data () {
      const localData = {...this.data}
      localData.size = {...localData.size}
      return {
        drawingCurve: false,
        toolsVisible: false,
        components: ['Chatbot_Answer', 'Chatbot_Question'],
        localData: localData
      }
    },
    watch: {
      localData: {
        handler (val) {
          this.sync()
        },
        deep: true
      }
    },
    computed: {
      defaultSize () {
        return settings[this.componentType].size
      },
      componentType () {
        return this.localData.type
      },
      componentName () {
        return settings[this.componentType].name
      },
      labelHeightByContent () {
        return this.$refs.label ? this.$refs.label.scrollHeight : this.initialLabelHeightByContent || 30
      },
      settings () {
        return settings[this.componentType]
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
          .attr("transform", "translate("+[this.localData.position.x - 4, this.localData.position.y - 4]+")")
      },
      setPosition (position) {
        this.localData.position = position
        this.redraw()
      },
      curves () {
        return this.$store.getters.getCurves(this.localData.id)
      },
      redraw () {
        this.arrange()

        this.curves().forEach(curve => curve.redraw());
      },
      calcSize() {
        this.$nextTick(function () {
          this.localData.size.width = this.$refs.component.$el.scrollWidth
          this.localData.size.height = this.$refs.component.$el.scrollHeight
          this.redraw()
        })
      },
      deleteObject () {
        this.$store.dispatch('removeObject', this.localData.id)
      },
      openSettings () {
        const openSettingsCallback = this.$refs.component.openSettings
        if (openSettingsCallback) openSettingsCallback()
      },
      sync: debounce(function () {
        if (!settings[this.componentType].disableSync) {
          CharObject.update({id: this.localData.id}, {object: this.localData})
        }
      }, 500),
      makeDraggable () {
        this.d3container.call(
          d3.drag()
            .on("start", () => {
              this.initialPosition = {
                x: d3.event.x - this.localData.position.x,
                y: d3.event.y - this.localData.position.y
              }
            })
            .on("drag", () => {
              var targetPosition = {
                x: d3.event.x - this.initialPosition.x,
                y: d3.event.y - this.initialPosition.y
              }
              this.setPosition(targetPosition)
            })
            .on("end", () => {
              
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
  }  
</style>
