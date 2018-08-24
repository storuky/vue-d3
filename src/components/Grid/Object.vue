<template>
  <g ref="container" :data-object-id="data.id" @mouseover="showTools()" @mouseleave="hideTools()">
    <!-- Object -->
    <foreignObject :height="data.size.height + 10" :width="data.size.width + 10" ref="foreignObject">
      <div style="margin: 4px" ref="content">
        <component @calcSize="calcSize()" :default={defaultSize} :is="componentType" :data="data"></component>
      </div>
    </foreignObject>

    <!-- Tools -->
    <foreignObject v-if="toolsVisible" y="-30" height="30" :width="data.size.width">
      <ObjectTools @deleteObject="deleteObject" :objectId="data.id" />
    </foreignObject>

    <!-- Label -->
    <foreignObject ref="labelFO" :height="$refs.label ? $refs.label.scrollHeight : 30" :width="data.size.width + 50" x="-20" :y="data.size.height+10">
      <div class="object-label" ref="label">
        {{data.info.title}}
      </div>
    </foreignObject>

    <!-- IN -->
    <foreignObject v-if="settings.has.in" height="12" :width="12" x="0" :y="data.size.height/2 - 2">
      <In />
    </foreignObject>

    <!-- OUT -->
    <foreignObject v-if="settings.has.out" height="12" :width="12" :x="data.size.width - 4" :y="data.size.height/2 - 2">
      <Out :objectId="data.id" />
    </foreignObject>

    <!-- RESIZER -->
    <foreignObject v-if="settings.has.resize" width="10" height="10" :x="data.size.width-3" :y="data.size.height-3">
      <Resizer :objectId="data.id" />
    </foreignObject>
  </g>
</template>

<script>
  import './Objects/Elements/in-out.css'

  import * as d3 from 'd3'
  import Person from './Objects/Person'
  import Organisation from './Objects/Organisation'
  import General from './Objects/General'
  import Question from './Objects/Question'
  import Answer from './Objects/Answer'
  import ComponentSelector from './Objects/ComponentSelector'
  import In from './Objects/Elements/In'
  import Out from './Objects/Elements/Out'
  import Resizer from './Objects/Elements/Resizer'
  import ObjectTools from './Objects/Elements/ObjectTools'

  import settings from './Objects/settings'

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
        this.arrange()
        this.makeDraggable()
        if (this.$refs.labelFO) {
          d3.select(this.$refs.labelFO).attr('height', this.$refs.label.scrollHeight)
        }
      })
    },
    data () {
      return {
        drawingCurve: false,
        toolsVisible: false,
        components: ['Answer', 'Question'],
      }
    },
    computed: {
      defaultSize () {
        return settings[this.componentType].size
      },
      componentType () {
        return this.data.type.replace("VulcanCore::ChartObject::", "")
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
          .attr("transform", "translate("+[this.data.position.x - 4, this.data.position.y - 4]+")")
      },
      setPosition (position) {
        this.data.position = position
        this.redraw()
      },
      curves () {
        return this.$store.getters.getCurves(this.data.id)
      },
      redraw () {
        this.arrange()

        this.curves().forEach(curve => curve.redraw());
      },
      calcSize() {
        this.$nextTick(function () {
          this.data.size.width = this.$refs.content.scrollWidth - 2
          this.data.size.height = this.$refs.content.scrollHeight
          this.redraw()
        })
      },
      deleteObject () {
        this.$store.dispatch('removeObject', this.data.id)
      },
      makeDraggable () {
        this.d3container.call(
          d3.drag()
            .on("start", () => {
              this.initialPosition = {
                x: d3.event.x - this.data.position.x,
                y: d3.event.y - this.data.position.y
              }
            })
            .on("drag", () => {
              this.setPosition({
                x: d3.event.x - this.initialPosition.x,
                y: d3.event.y - this.initialPosition.y
              })
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
