<template>
  <div :style="{width: (localSettings.width || 100) + '%'}">
    <slot :openSettings="openSettings"></slot>
    <div class="chatbot-checkboxlist">
      <div class="title" v-html="localSettings.title"></div>
      <v-checkbox disabled :key="option.id" v-for="option in localSettings.options" v-model="model" :label="option.value" :value="option.value"></v-checkbox>
    </div>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import Settings from './Settings'

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
