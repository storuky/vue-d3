<template>
  <div :style="{width: (localSettings.width || 100) + '%'}">
    <slot :openSettings="openSettings"></slot>
    <div @add="openSettings()" class="chatbot-video">
    </div>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import Settings from './Settings'

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
        this.$modal.show(Settings, {
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

<style scope>
  .chatbot-video {
  }
</style>
