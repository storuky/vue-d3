<template>
  <div class="curve-in-out out"></div>
</template>

<script>
  import * as d3 from 'd3'

  export default {
    name: 'Out',
    props: {
      objectId: Number
    },
    mounted () {
      this.$nextTick(function () {
        this.d3el = d3.select(this.$el)
        this.objectComponent = this.$store.getters.getObjectComponent(this.objectId)

        d3.select(this.$el)
        .call(
          d3.drag()
            .on('start', () => {
              this.curve = this.$store.getters.getDrawingCurve()
              this.initialPosition = this.$store.getters.getPoints({from: this.objectId})
              this.initialPositionFromEvent = {x: d3.event.x, y: d3.event.y}

              this.curve.setFrom(this.objectId)
            })
            .on('drag', () => {
              let resultPosition = {
                x: (d3.event.x - this.initialPositionFromEvent.x)/this.$store.getters.getChartScale() + this.initialPosition.x,
                y: (d3.event.y - this.initialPositionFromEvent.y)/this.$store.getters.getChartScale() + this.initialPosition.y
              }
              this.curve.redraw(resultPosition)

              let targetObjectNode = d3.event.sourceEvent.path.find(el => {
                if (el.dataset && el.dataset.objectId) {
                  this.targetObjectComponent = this.$store.getters.getObjectComponent(el.dataset.objectId)

                  var id = this.targetObjectComponent.data.id
                  if (id != this.curve.fromLocal && !this.$store.getters.getCurve({from: this.objectId, to: id})) {
                    this.curve.toLocal = this.targetObjectComponent.data.id
                  }
                  return true
                }
              })

              if (!targetObjectNode && this.targetObjectComponent) {
                this.targetObjectComponent = null
                this.curve.toLocal = null
              }
            })
            .on('end', () => {
              if (this.targetObjectComponent) {
                this.$store.dispatch('createCurve', {from: this.objectId, to: parseInt(this.targetObjectComponent.data.id)})
                this.targetObjectComponent = null
                this.curve.toLocal = null
              }

              this.curve.clear()
            })
        )

        // this.d3el
        //   .on('mousedown', () => d3.event.stopPropagation())
        //   .call(
        //     d3.drag()
        //       .on('start', () => {
        //         this.curve = this.$store.getters.getDrawingCurve()
        //         this.curve.setFrom(this.objectId)
        //         console.log(d3.event.x, d3.event.y)
        //       })
        //       .on('drag', (e) => {
        //         this.curve.redraw()

                // let targetObjectNode = d3.event.sourceEvent.path.find(el => {
                //   if (el.dataset && el.dataset.objectId) {
                //     this.targetObjectComponent = this.$store.getters.getObjectComponent(el.dataset.objectId)

                //     var id = this.targetObjectComponent.data.id
                //     if (id != this.curve.fromLocal && !this.$store.getters.getCurve({from: this.objectId, to: id})) {
                //       this.curve.toLocal = this.targetObjectComponent.data.id
                //     }
                //     return true
                //   }
                // })

                // if (!targetObjectNode && this.targetObjectComponent) {
                //   this.targetObjectComponent = null
                //   this.curve.toLocal = null
                // }
        //       })
        //       .on('end', () => {
                
        //       })
        //   )
      })
    }
  }
</script>

<style>
  .out {
    background: #0159a6;
    right: -8px;
  }
</style>
