<template>
  <div class="curve-in-out in" :style="{background: color}"></div>
</template>

<script>
  import * as d3 from 'd3'
  export default {
    name: 'In',
    props: {
      color: {
        type: String,
        default: '#df4e9e'
      }
    }
  }
</script>

<style scoped>
  .in {
    background: #e44e9d;
    float: left;
  }
</style>
