<template>
  <div @click="openSettings()" class="chatbot-message" :style="{minWidth: this.data.size.width + 'px', minHeight: this.data.size.height + 'px'}">
    <ol v-if="settingsLocal.answerVariants.length > 1">
      <li :key="variant.id" v-for="variant in settingsLocal.answerVariants">
        {{variant.text}}
      </li>
    </ol>
    <div v-else>
      {{settingsLocal.answerVariants[0].text}}
    </div>
  </div>
</template>

<script>
  import SettingsModal from './SettingsModal'
  export default {
    name: "ChatbotAnswer",
    props: {
      data: Object,
      default: Object
    },
    components: {
      SettingsModal
    },
    data () {
      const settings = {...this.data.info.settings}

      return {
        settingsLocal: settings
      }
    },
    methods: {
      openSettings () {
        this.$modal.show(SettingsModal, {
          settings: this.settingsLocal,
          onSave: (settings) => {
            this.settingsLocal = settings
            this.$emit("calcSize")
          }
        }, {
          height: 'auto',
          scrollable: true
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
