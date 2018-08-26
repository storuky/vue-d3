<template>
  <div @click="openSettings()" class="chatbot-message">
    <ol v-if="localSettings.answerVariants.length > 1">
      <li :key="variant.id" v-for="variant in localSettings.answerVariants">
        {{variant.text}}
      </li>
    </ol>
    <div v-else>
      {{localSettings.answerVariants[0] && localSettings.answerVariants[0].text || "Click to Add"}}
    </div>
  </div>
</template>

<script>
  import SettingsModal from './SettingsModal'
  export default {
    name: "ChatbotAnswer",
    props: {
      value: Object,
      size: Object
    },
    data () {
      const settings = {...this.value}
      if (!settings.answerVariants) {
        settings.answerVariants = []
      }
      return {
        localSettings: settings
      }
    },
    methods: {
      openSettings () {
        this.$modal.show(SettingsModal, {
          settings: this.localSettings,
          onSave: (settings) => {
            this.localSettings = settings
            this.$emit("calcSize")
            this.$emit("input", this.localSettings)
          }
        }, {
          height: 'auto',
          scrollable: true,
          name: "object-editor"
        })
      }
    }
  }
</script>

<style scoped>
  .chatbot-message {
    cursor: pointer;
    background: #df4e9e;
    color: white;
    font-weight: bold;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    text-align: center;
    padding: 10px;
    text-shadow: 1px 1px 3px rgba(0,0,0,.1);
  }

  .chatbot-message ol {
    text-align: left;
  }
</style>
