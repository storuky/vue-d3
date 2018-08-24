<template>
  <div @click="openSettings()" class="chatbot-image" :style="{width: (localSettings.width || 100) + '%'}">
    <div v-if="!localSettings.src" class="component-settings">Image Settings</div>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import ImageSettingsModal from '../../../modals/ControlSettings/Image'
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
        this.$modal.show(ImageSettingsModal, {
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
  .chatbot-image {
    display: block;
  }
</style>
