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

        this.d3el.call(
          d3.drag()
            .on('start', () => {
              this.curve = this.$store.getters.getDrawingCurve()
              this.initialPosition = this.$store.getters.getPoints({from: this.objectId})
              this.initialPositionFromEvent = {x: d3.event.x, y: d3.event.y}

              this.curve.setFrom(this.objectId)
            })
            .on('drag', () => {
              this.resultPosition = {
                x: d3.event.x - this.initialPositionFromEvent.x + this.initialPosition.x - 10,
                y: d3.event.y - this.initialPositionFromEvent.y + this.initialPosition.y - 2
              }

              this.curve.redraw(this.resultPosition)
              
              const target = d3.event.sourceEvent.target
              const targetObjectNode = target && target.closest ? target.closest('g[data-object-id]') : null
              if (targetObjectNode) {
                this.targetObjectComponent = this.$store.getters.getObjectComponent(targetObjectNode.dataset.objectId)

                var id = this.targetObjectComponent.data.id
                if (id != this.curve.fromLocal && !this.$store.getters.getCurve({from: this.objectId, to: id})) {
                  this.curve.toLocal = this.targetObjectComponent.data.id
                }
              }

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
              } else {
                if (d3.event.x - this.initialPositionFromEvent.x > 20) {
                  if (this.objectComponent.settings.components.length) {
                    this.$store.dispatch('createObject', {
                      type: 'ComponentSelector',
                      position: {
                        x: this.resultPosition.x,
                        y: this.resultPosition.y - 50
                      },
                      size: {
                        width: 250,
                        height: 100
                      },
                      components: this.objectComponent.settings.components,
                      info: {
                        title: "Click to add"
                      },
                    }).then(res => {
                      this.$store.dispatch('createCurve', {
                        from: this.objectComponent.data.id,
                        to: res.id
                      })
                    })
                  }
                }
              }

              this.curve.clear()
            })
        )
      })
    }
  }
</script>

<style>
  .out {
    background: #505fa6;
    float: right;
  }
</style>
