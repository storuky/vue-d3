<template>
  <div class="resizer"></div>
</template>

<script>
  import * as d3 from 'd3'

  export default {
    name: "Resizer",
    props: {
      objectId: Number
    },
    data() {
      return {
        objectComponent: null
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.d3el = d3.select(this.$el)
        this.object = this.$store.getters['objects/getObject'](this.objectId)

        this.d3el.call(
          d3.drag()
            .on('start', () => {
              const position = this.object.position,
                    size = this.object.size

              this.initialPosition = {
                x: position.x + size.width,
                y: position.y + size.height
              }
              this.initialSize = {
                width: size.width,
                height: size.height
              }
              this.initialPositionFromEvent = {x: d3.event.x, y: d3.event.y}
            })
            .on('drag', () => {
              let resultPosition = {
                x: d3.event.x - this.initialPositionFromEvent.x,
                y: d3.event.y - this.initialPositionFromEvent.y
              }
              let width = resultPosition.x + this.initialSize.width,
                  height = resultPosition.y + this.initialSize.height

              this.object.size = {
                width, height
              }

              this.$root.$emit(`redrawObject-${this.objectId}`)
            })
        )
      })
    }
  }
</script>

<style scoped>
  .resizer {
    width: 10px;
    height: 10px;
    background: #ffffff;
    border: 3px solid #505fa6;
    cursor: nwse-resize;
  }
</style>
