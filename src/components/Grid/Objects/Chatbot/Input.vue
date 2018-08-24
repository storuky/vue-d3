<template>
  <input class="chatbot-input" type="text" placeholder="Input" :style="{width: (settings.width || 100) + '%'}">
</template>

<script>
  export default {
    name: "ChatbotInput",
    props: {
      settings: Object
    }
  }
</script>

<style>
  .chatbot-input {
    box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
    border-radius: 5px;
    height: 37px;
    padding: 10px;
    width: 100%;
    margin: 0 10px;
  }
</style>
