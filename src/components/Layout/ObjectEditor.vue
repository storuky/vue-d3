<template>
  <vue-draggable-resizable class="object-editor" :w="300" :h="300" :x="left" :y="100">
    <div class="title">Object Editor</div>
  </vue-draggable-resizable>
</template>

<script>
  export default {
    name: "ObjectEditor",
    data () {
      return {
        left: window.innerWidth - 320
      }
    }
  }
</script>

<style>
  .object-editor {
    background: white;
    box-shadow: 0 0 8px rgba(0,0,0,.12);
    padding: 15px;
  }
</style>
