<template>
  <div :style="{width: (localSettings.width || 100) + '%'}">
    <slot :openSettings="openSettings"></slot>
    <div @add="openSettings()" class="chatbot-video">
    </div>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import SettingsModal from './SettingsModal'

  export default {
    name: "ChatbotVideo",
    props: {
      value: Object
    },
    mounted () {
      this.$nextTick(function () {
        d3.select(this.$el).on('mousedown', () => d3.event.stopPropagation())
      })
    },
    data() {
      return {
        localSettings: {...this.value},
      }
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
          scrollable: true, height: "auto", name: "object-editor"
        })
      }
    }
  }
</script>

<style scope>
  .chatbot-video {
  }
</style>
