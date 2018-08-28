<template>
  <div class="question-actions-item" :style="{width: (localSettings.width || 100) + '%'}">
    <slot :openSettings="openSettings"></slot>
    <div @click="openSettings()" class="chatbot-select" v-html="label" :style="{width: (localSettings.width || 100) + '%'}">
    </div>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import Settings from './Settings'

  export default {
    name: "ChatbotSelect",
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
    computed: {
      label () {
        return this.localSettings.options && this.localSettings.options.length ? this.localSettings.options[0].text : 'select'
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

<style scoped>
  .chatbot-select {
    cursor: pointer;
    background-color: #f5f5f5;
    height: 36px;
    box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    border-radius: 3px;
  }
</style>