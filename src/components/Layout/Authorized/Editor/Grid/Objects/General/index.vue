<template>
  <div class="general-border gradient" :style="{width: size.width + 'px', height: size.height + 'px'}">
    <div class="general">
      
    </div>
  </div>
</template>

<script>
  export default {
    name: "General",
    props: {
      data: Object,
      size: Object
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
