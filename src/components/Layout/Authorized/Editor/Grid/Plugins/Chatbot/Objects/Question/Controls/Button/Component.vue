<template>
  <div class="question-actions-item" :style="{width: (localSettings.width || 100) + '%'}">
    <slot :openSettings="openSettings"></slot>
    <div @click="openSettings()" class="chatbot-button" v-html="localSettings.label || 'Button'">

    </div>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import Settings from './Settings'
  export default {
    name: "ChatbotButton",
    props: {
      value: Object
    },
    data() {
      return {
        localSettings: {...this.value}
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
  .chatbot-button {
    cursor: pointer;
    background-color: #e34e9d;
    height: 36px;
    box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    text-transform: uppercase;
    color: white;
    border-radius: 3px;
    width: 100%;
  }
</style>
