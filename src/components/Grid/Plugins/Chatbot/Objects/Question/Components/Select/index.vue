<template>
  <div @click="openSettings()" class="chatbot-select" v-html="label" :style="{width: (localSettings.width || 100) + '%'}">
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import SettingsModal from './SettingsModal'

  export default {
    name: "ChatbotSelect",
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
    computed: {
      label () {
        return this.localSettings.options && this.localSettings.options.length ? this.localSettings.options[0].text : 'select'
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
          scrollable: true, height: "auto", name: "object-editor"
        })
      }
    }
  }
</script>

<style scoped>
  .chatbot-select {
    cursor: pointer;
    margin: 0 10px;
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