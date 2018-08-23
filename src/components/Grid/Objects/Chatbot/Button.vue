<template>
  <div class="chatbot-button" v-html="state.label" :style="{width: (state.width || 100) + '%'}">
  </div>
</template>

<script>
  export default {
    name: "ChatbotButton",
    props: {
      settings: Object
    },
    computed: {
      state () {
        return this.settings.settings.states[0]
      }
    }
  }
</script>

<style scoped>
  .chatbot-button {
    cursor: pointer;
    margin: 0 10px;
    background-color: #e34e9d;
    height: 36px;
    box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    text-transform: uppercase;
    color: white;
    border-radius: 3px;
  }

  .chatbot-button:hover {
    filter: brightness(105%);
  }
</style>
