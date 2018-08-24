<template>
  <div class="chatbot-select" v-html="settings.label || 'select'" :style="{width: (settings.width || 100) + '%'}">
  </div>
</template>

<script>
  export default {
    name: "ChatbotSelect",
    props: {
      settings: Object
    }
  }
</script>

<style scope>
  .chatbot-select {
    cursor: pointer;
    margin: 0 10px;
    background-color: #f5f5f5;
    height: 36px;
    box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    border-radius: 3px;
  }
</style>