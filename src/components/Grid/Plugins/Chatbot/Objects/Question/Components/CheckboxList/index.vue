<template>
  <div :style="{width: (localSettings.width || 100) + '%'}">
    <Separator @settings="openSettings()" label="CheckboxList" :actions="['settings']" />
    <div class="chatbot-checkboxlist">
      <div class="title" v-html="localSettings.title"></div>
      <v-checkbox disabled :key="option.id" v-for="option in localSettings.options" v-model="model" :label="option.text" :value="option.text"></v-checkbox>
    </div>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import SettingsModal from './SettingsModal'
  import Separator from '../../UI/Separator'

  export default {
    name: "ChatbotCheckboxList",
    props: {
      settings: Object,
    },
    components: {Separator},
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
