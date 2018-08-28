<template>
  <div class="chatbot-dialogflow-border">
    <div @click="openSettings()" class="chatbot-dialogflow">

    </div>
  </div>
</template>

<script>
  import Settings from './Settings'
  export default {
    name: "Chatbot_Answer",
    props: {
      value: Object,
      size: Object
    },
    data () {
      const settings = {...this.value}

      return {
        localSettings: settings
      }
    },
    methods: {
      openSettings () {
        this.$modal.show(Settings, {
          settings: this.localSettings,
          onSave: (settings) => {
            this.localSettings = settings
            this.$emit("calcSize")
            this.$emit("input", this.localSettings)
          }
        }, {
          height: 'auto',
          scrollable: true,
          overlayClasses: ['object-editor-overlay'], transition: 'object-editor', name: 'object-editor',
        })
      }
    }
  }
</script>

<style scoped>
  .chatbot-dialogflow-border {
    padding: 3px;
    background: #ef6c00;
    border-radius: 10px;
    height: 100%;
  }
  .chatbot-dialogflow {
    cursor: pointer;
    height: 100%;
    background: white;
    background-image: url('./dialogflow-logo.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    color: #333;
    font-weight: bold;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    text-align: center;
    padding: 10px;
  }
</style>
