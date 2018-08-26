<template>
  <g ref="container" :data-object-id="localData.id" @mouseover="showTools()" @mouseleave="hideTools()">
    <!-- Object -->
    <foreignObject :height="localData.size.height + 10" :width="localData.size.width + 10" ref="foreignObject">
      <div style="margin: 4px; width: calc(100% - 8px); height: calc(100% - 8px)" ref="content">
        <component ref="component" @calcSize="calcSize()" :default={defaultSize} :is="componentType" v-model="localData.info.settings" :componentId="localData.id" :size="localData.size" :position="localData.position"></component>
      </div>
    </foreignObject>

    <!-- Tools -->
    <foreignObject v-if="toolsVisible" y="-30" height="30" :width="localData.size.width">
      <ObjectTools @openSettings="openSettings" @deleteObject="deleteObject" :objectId="localData.id" />
    </foreignObject>

    <!-- Label -->
    <foreignObject ref="labelFO" :height="$refs.label ? $refs.label.scrollHeight : 30" :width="localData.size.width + 50" x="-20" :y="localData.size.height+10">
      <div class="object-label" ref="label">
        {{localData.info.settings.title || localData.info.title || componentType}}
      </div>
    </foreignObject>

    <!-- IN -->
    <foreignObject v-if="settings.has.in" height="12" :width="12" x="0" :y="localData.size.height/2 - 2">
      <In />
    </foreignObject>

    <!-- OUT -->
    <foreignObject v-if="settings.has.out" height="12" :width="12" :x="localData.size.width - 3" :y="localData.size.height/2 - 2">
      <Out :objectId="localData.id" />
    </foreignObject>

    <!-- RESIZER -->
    <foreignObject v-if="settings.has.resize" width="10" height="10" :x="localData.size.width-3" :y="localData.size.height-3">
      <Resizer :objectId="localData.id" />
    </foreignObject>
  </g>
</template>

<script>
  import './Objects/Elements/in-out.css'

  import * as d3 from 'd3'

  // Basic
  import Person from './Objects/Person/index'
  import Organisation from './Objects/Organisation/index'
  import General from './Objects/General/index'
  import ComponentSelector from './Objects/ComponentsSelector/index'

  // Plugins
  import Question from './Plugins/Chatbot/Objects/Question/index'
  import Answer from './Plugins/Chatbot/Objects/Answer/index'

  // Elements
  import In from './Objects/Elements/In'
  import Out from './Objects/Elements/Out'
  import Resizer from './Objects/Elements/Resizer'
  import ObjectTools from './Objects/Elements/ObjectTools'

  import settings from './settings'
  import debounce from '../../../../../utils'

  import { CharObject } from '../../../../../resources/index'
  
  export default {
    name: "BaseObject",
    props: {
      data: Object
    },
    components: {
      Person,
      Organisation,
      General,
      Answer,
      Question,
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
      })
    },
    data () {
      const localData = {...this.data}
      localData.size = {...localData.size}
      return {
        drawingCurve: false,
        toolsVisible: false,
        components: ['Answer', 'Question'],
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
          this.localData.size.width = this.$refs.content.scrollWidth - 2
          this.localData.size.height = this.$refs.content.scrollHeight
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
