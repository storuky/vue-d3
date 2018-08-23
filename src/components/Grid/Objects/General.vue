<template>
  <div class="general-border gradient" :style="{width: width + 'px', height: height + 'px'}">
    <div class="general">
      
    </div>
  </div>
</template>

<script>
  export default {
    name: "General",
    props: {
      data: Object,
      default: Object
    },
    computed: {
      width () {
        return this.data.size.width || this.defaule.size.width
      },
      height () {
        return this.data.size.height || this.defaule.size.height
      }
    }
  }
</script>

<style scoped>
  .general-border {
    padding: 4px;
  }

  .general {
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
</style>
