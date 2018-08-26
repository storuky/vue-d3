<template>
  <div :style="{width: (localSettings.width || 100) + '%'}">
    <slot :openSettings="openSettings"></slot>
    <div class="chatbot-checkboxlist">
      <div class="title" v-html="localSettings.title"></div>
      <v-checkbox disabled :key="option.id" v-for="option in localSettings.options" v-model="model" :label="option.text" :value="option.text"></v-checkbox>
    </div>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import SettingsModal from './SettingsModal'

  export default {
    name: "ChatbotCheckboxList",
    props: {
      value: Object,
    },
    mounted () {
      this.$nextTick(function () {
        d3.select(this.$el).on('mousedown', () => d3.event.stopPropagation())
      })
    },
    data() {
      return {
        localSettings: {...this.value},
        model: undefined
      }
    },
    methods: {
      openSettings () {
        this.$modal.show(SettingsModal, {
          settings: this.localSettings,
          onSave: (settings) => {
            this.localSettings = settings
            this.$emit('calcSize')
            this.$emit('input', this.localSettings)
          }
        }, {
          scrollable: true, height: "auto", name: "object-editor"
        })
      }
    }
  }
</script>

<style scoped>
  .title {
    text-align: center;
  }
  .chatbot-checkboxlist {
    display: block;
    margin-top: 20px;
  }
</style>

<style>
  .chatbot-checkboxlist .v-messages {
    display: none;
  }

  .chatbot-checkboxlist .v-input {
    margin-top: 0;
  }

  .chatbot-checkboxlist .v-label,
  .chatbot-checkboxlist .v-icon  {
    color: #333 !important;
  }
</style>
