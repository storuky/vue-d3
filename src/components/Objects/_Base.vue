<template>
  <g :data-object-id="data.id">
    <foreignObject ref="foreignObject">
      <component :is="componenType" :data="data"></component>
    </foreignObject>
  </g>
</template>

<script>
  import './Elements/in-out.css'

  import * as d3 from 'd3'
  import Person from './Person'
  import Organisation from './Organisation'
  import General from './General'
  import Curve from '../Curve/Curve'


  export default {
    name: "BaseObject",
    props: {
      data: Object
    },
    components: {
      Person,
      Organisation,
      General,
      Curve
    },
    created () {
      this.$store.dispatch("addObject", this)
    },
    mounted () {
      this.$nextTick(function () {
        this.d3foreignObject = d3.select(this.$refs.foreignObject)
        this.calcSize()
        this.arrange()
        this.makeDraggable()
      })
    },
    data () {
      return {
        drawingCurve: false
      }
    },
    computed: {
      componenType () {
        return this.data.type.replace("VulcanCore::ChartObject::", "")
      }
    },
    methods: {
      calcSize () {
        this.d3foreignObject
          .attr("width", this.$refs.foreignObject.scrollWidth)
          .attr("height", this.$refs.foreignObject.scrollHeight)
      },
      arrange () {
        this.d3foreignObject
          .attr("transform", "translate("+[this.data.position.x, this.data.position.y]+")")
      },
      setPosition (position) {
        this.data.position = position
        this.arrange()
        const curves = this.$store.getters.getCurves(this.data.id)
        curves.forEach(curve => curve.redraw());
      },
      makeDraggable () {
        this.d3foreignObject.call(
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

<style>
  
</style>
