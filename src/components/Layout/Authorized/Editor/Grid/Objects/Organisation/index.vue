<template>
  <div class="organisation-border gradient" :style="{width: size.width + 'px', height: size.height + 'px'}">
    <div class="organisation">
    </div>
  </div>
</template>

<script>
  export default {
    name: "Organisation",
    props: {
      data: Object,
      size: Object
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
