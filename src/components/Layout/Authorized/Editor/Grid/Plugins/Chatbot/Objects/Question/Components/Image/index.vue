<template>
  <div :style="{width: (localSettings.width || 100) + '%'}">
    <slot :openSettings="openSettings"></slot>
    <div class="chatbot-image">

    </div>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import SettingsModal from './SettingsModal'

  export default {
    name: "ChatbotImage",
    props: {
      settings: Object
    },
    data() {
      return {
        localSettings: {...this.settings},
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
  .chatbot-image {
  }
</style>
