<template>
  <div :style="{width: (localSettings.width || 100) + '%'}">
    <slot :openSettings="openSettings"></slot>
    <div class="chatbot-image">
      <div v-if="localSettings.image && localSettings.image.body">
        <img width="100%" :src="localSettings.image.body.url" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import Settings from './Settings'

  export default {
    name: "ChatbotImage",
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
        this.$modal.show(Settings, {
          settings: this.localSettings,
          onSave: (settings) => {
            this.localSettings = settings
            this.$emit('calcSize')
            this.$emit('input', this.localSettings)
          }
        }, {
          scrollable: true, height: "auto", overlayClasses: ['object-editor-overlay'], transition: 'object-editor', name: 'object-editor',
        })
      }
    }
  }
</script>

<style scope>
  .chatbot-image {
    padding: 15px 0;
  }
</style>
