<template>
  <div class="chatbot-message" :style="{width: width + 'px', height: height + 'px'}">
    <div>{{data.info.title}}</div>
  </div>
</template>

<script>
  export default {
    name: "ChatbotMessage",
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
  .chatbot-message {
    background: #df4e9e;
    color: white;
    font-weight: bold;
    border-radius: 1000px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    text-align: center;
    text-shadow: 1px 1px 3px rgba(0,0,0,.1);
  }
</style>
