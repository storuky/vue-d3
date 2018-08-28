<template>
  <div class="curve-in-out out" :style="{background: color}"></div>
</template>

<script>
  import * as d3 from 'd3'
  import settings from '../../settings'

  export default {
    name: 'Out',
    props: {
      objectId: Number,
      color: {
        type: String,
        default: '#505fa6'
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.d3el = d3.select(this.$el)

        this.d3el.call(
          d3.drag()
            .on('start', () => {
              this.initialPosition = this.$store.getters['objects/getPoints']({from: this.objectId})
              this.$store.dispatch('curves/initDrawingCurve', {from: this.objectId, position: this.initialPosition})
              this.initialPositionFromEvent = {x: d3.event.x, y: d3.event.y}
              this.curve = this.$store.getters['curves/getDrawingCurve']
              this.fromObject = this.$store.getters['objects/getObject'](this.objectId)
            })
            .on('drag', () => {
              this.resultPosition = {
                x: d3.event.x - this.initialPositionFromEvent.x + this.initialPosition.x - 10,
                y: d3.event.y - this.initialPositionFromEvent.y + this.initialPosition.y - 2
              }
              this.targetForCurve = this.resultPosition

              const target = d3.event.sourceEvent.target
              const targetObjectNode = target && target.closest ? target.closest('g[data-object-id]') : null

              if (targetObjectNode) {
                const id = targetObjectNode.dataset.objectId
                
                const toObject = this.$store.getters['objects/getObject'](id)
                const canBeTarget = settings[this.fromObject.type].components.includes(toObject.type)
                const curveExist = this.$store.getters['curves/getCurve']({from: this.objectId, to: id})

                if (canBeTarget && id != this.objectId && !curveExist) {
                  this.targetObject = toObject
                  this.targetForCurve = {
                    to: this.targetObject.id
                  }
                }
              }
              this.$store.dispatch('curves/setTargetForDrawingCurve', this.targetForCurve)
              this.$root.$emit(`redrawCurve-${this.curve.id}`, this.targetForCurve)

              if (!targetObjectNode && this.targetObject) {
                this.targetObject = null
              }
            })
            .on('end', () => {
              if (this.targetObject) {
                this.$store.dispatch('curves/create', {
                  from: this.objectId,
                  to: this.targetObject.id,
                  callback: () => {
                    this.targetObject = null
                    this.$store.dispatch('curves/deleteDrawingCurve')
                  }
                })
              } else {
                if (d3.event.x - this.initialPositionFromEvent.x > 20) {
                  this.$store.dispatch('objects/create', {
                    type: 'ComponentSelector',
                    position: {
                      x: this.resultPosition.x,
                      y: this.resultPosition.y - 50
                    },
                    size: {
                      width: 250,
                      height: 100
                    },
                    info: {
                      settings: {
                        components: settings[this.fromObject.type].components,
                      }
                    },
                  }).then(res => {
                    this.$store.dispatch('curves/create', {
                      from: this.objectId,
                      to: res.id,
                      callback: () => this.$store.dispatch('curves/deleteDrawingCurve')
                    })
                  })
                } else {
                  this.$store.dispatch('curves/deleteDrawingCurve')
                }
              }
            })
        )
      })
    }
  }
</script>

<style>
  .out {
    float: right;
  }
</style>
