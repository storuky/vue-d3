<template>
  <div class="organisation-border gradient" :style="{width: width + 'px', height: height + 'px'}">
    <div class="organisation">
    </div>
  </div>
</template>

<script>
  export default {
    name: "Organisation",
    props: {
      data: Object,
      default: Object
    },
    components: {},
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
  .organisation-border {
    padding: 4px;
  }

  .organisation {
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
</style>
