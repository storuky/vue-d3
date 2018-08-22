<template>
  <div class="organisation" :style="{width: width + 'px', height: height + 'px'}">
    <div :style="{width: width + 'px', height: height + 'px'}">Organisation</div>
    <In />
    <Out :objectId="data.id" />
  </div>
</template>

<script>
  import In from './Elements/In'
  import Out from './Elements/Out'
  
  export default {
    name: "Organisation",
    props: {
      data: Object
    },
    components: {In, Out},
    data() {
      return {
        width: this.data.size.width || 100,
        height: this.data.size.height || 100
      }
    }
  }
</script>

<style scoped>
  .organisation {
    background: #e7e7e7;
  }
</style>
