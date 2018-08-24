<template>
  <div @click="openSettings()" class="chatbot-checkboxlist" :style="{width: (localSettings.width || 100) + '%'}">
    <div v-if="!localSettings.options || localSettings.options.length == 0" class="component-settings">Checkbox List Settings</div>
    <v-checkbox disabled :key="option.id" v-for="option in localSettings.options" v-model="model" :label="option.text" :value="option.text"></v-checkbox>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import CheckboxListSettingsModal from '../../../modals/ControlSettings/CheckboxList'

  export default {
    name: "ChatbotCheckboxList",
    props: {
      settings: Object,
    },
    mounted () {
      this.$nextTick(function () {
        d3.select(this.$el).on('mousedown', () => d3.event.stopPropagation())
      })
    },
    data() {
      return {
        localSettings: {...this.settings},
        model: undefined
      }
    },
    methods: {
      openSettings () {
        this.$modal.show(CheckboxListSettingsModal, {
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

<style scoped>
  .chatbot-checkboxlist {
    display: block;
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
