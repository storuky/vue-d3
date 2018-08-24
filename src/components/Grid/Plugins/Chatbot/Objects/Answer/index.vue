<template>
  <div @click="openSettings()" class="chatbot-message" :style="{minWidth: this.data.size.width + 'px', minHeight: this.data.size.height + 'px'}">
    <div>{{settingsLocal.title}}</div>
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
      const settings = {...this.data.settings}

      return {
        settingsLocal: settings
      }
    },
    methods: {
      openSettings () {
        this.$modal.show(SettingsModal, {
          settings: this.settings,
          onSave: (settings) => {
            this.settingsLocal = settings
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
    border-radius: 1000px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    text-align: center;
    text-shadow: 1px 1px 3px rgba(0,0,0,.1);
  }
</style>
