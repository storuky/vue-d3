<template>
  <div @click="openSettings()" class="chatbot-video" :style="{width: (localSettings.width || 100) + '%'}">
    Video
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import SettingsModal from './SettingsModal'

  export default {
    name: "ChatbotVideo",
    props: {
      settings: Object
    },
    mounted () {
      this.$nextTick(function () {
        d3.select(this.$el).on('mousedown', () => d3.event.stopPropagation())
      })
    },
    data() {
      return {
        localSettings: {...this.settings},
      }
    },
    methods: {
      openSettings () {
        this.$modal.show(SettingsModal, {
          settings: this.localSettings,
          onSave: (settings) => {
            this.localSettings = settings
            this.$emit('calcSize')
          }
        }, {
          scrollable: true, height: "auto"
        })
      }
    }
  }
</script>

<style scope>
  .chatbot-video {
    background: #e7e7e7;
    height: 200px;
    width: 100%;
    cursor: pointer;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }
</style>
