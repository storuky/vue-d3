<template>
  <div class="person-border gradient" :style="{width: width + 'px', height: height + 'px'}">
    <div class="person">
      <div class="avatar"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Person',
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
    },
    components: {}
  }
</script>

<style scoped>
  .person-border {
    display: block;
    box-sizing: border-box;
    border-radius: 1000px;
    padding: 4px;
  }
  .person {
    text-align: center;
    width: 100%;
    height: 100%;
  }

  .avatar {
    border-radius: 1000px;
    background: white;
    background-size: cover;
    display: inline-block;
    height: 100%;
    width: 100%;
  }
</style>
