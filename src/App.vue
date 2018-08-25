<template>
  <v-app id="app" data-app light>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  * {
    box-sizing: border-box;
  }
  .work-area {
    position: absolute;
    left: 0;
    right: 0;
    top: 84px;
    bottom: 0;
    background: #f8f8f8;
    z-index: 2;
  }

  .wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: .2s;
    overflow: hidden;
  }

  .grid-container {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    box-shadow: -1px 0px 10px 0 rgba(0, 0, 0, 0.12);
  }
</style>
