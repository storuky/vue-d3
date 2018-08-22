<template>
  <div class="general-border" :style="{width: width + 'px', height: height + 'px'}">
    <div class="general">
      Text text
      <In />
      <Out :objectId="data.id" />
      <Resizer :objectId="data.id" />
    </div>
  </div>
</template>

<script>
  import In from './Elements/In'
  import Out from './Elements/Out'
  import Resizer from './Elements/Resizer'

  export default {
    name: "General",
    props: {
      data: Object
    },
    components: {In, Out, Resizer},
    computed: {
      width: function () {
        return this.data.size.width || 100
      },
      height: function () {
        return this.data.size.height || 100
      }
    }
  }
</script>

<style scoped>
  .general-border {
    background: #00a956;
    background: -moz-linear-gradient(left, #00a956 0%, #0159a6 100%);
    background: -webkit-linear-gradient(left, #00a956 0%,#0159a6 100%);
    background: linear-gradient(to right, #00a956 0%,#0159a6 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00a956', endColorstr='#0159a6',GradientType=1 );
    padding: 4px;
    position: relative;
  }

  .general {
    width: 100%;
    height: 100%;
    background: #e7e7e7;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
</style>
