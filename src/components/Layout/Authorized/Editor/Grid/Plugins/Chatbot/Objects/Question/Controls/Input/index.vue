<template>
  <div @click="openSettings()" class="chatbot-input" v-html="localSettings.placeholder || 'Input'" :style="{width: (localSettings.width || 100) + '%'}"></div>
</template>

<script>
  import * as d3 from 'd3'
  import SettingsModal from './SettingsModal'
  export default {
    name: "ChatbotInput",
    props: {
      value: Object
    },
    data() {
      return {
        localSettings: {...this.value},
      }
    },
    mounted () {
      this.$nextTick(function () {
        d3.select(this.$el).on('mousedown', () => d3.event.stopPropagation())
      })
    },
    methods: {
      openSettings () {
        this.$modal.show(SettingsModal, {
          settings: this.localSettings,
          onSave: (settings) => {
            this.localSettings = settings
            this.$emit('input', this.localSettings)
            this.$emit('calcSize')
          }
        }, {
          scrollable: true, height: "auto", overlayClasses: ['object-editor-overlay'], transition: 'object-editor', name: 'object-editor',
        })
      }
    }
  }
</script>

<style scoped>
  .chatbot-input {
    box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
    border-radius: 5px;
    height: 37px;
    padding: 8px 10px;
    width: 100%;
    margin: 0 10px;
    color: #8a8a8a;
    cursor: pointer;
  }
</style>
