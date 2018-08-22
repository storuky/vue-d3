<template>
  <div class="curve-in-out in"></div>
</template>

<script>
  import * as d3 from 'd3'
  export default {
    name: 'In',
    mounted () {
      this.$nextTick(function () {
        d3.select(this.$el)
        .call(
          d3.drag()
            .on('start', function () {
              console.log(this)
              console.log(d3.event.x, d3.event.y)
            })
        )
      })
    }
  }
</script>

<style>
  .in {
    background: #00a956;
    left: -4px;
  }
</style>
