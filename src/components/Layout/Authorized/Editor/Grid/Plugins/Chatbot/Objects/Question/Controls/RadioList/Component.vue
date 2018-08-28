<template>
  <div @add="openSettings()" :style="{width: (localSettings.width || 100) + '%'}">
    <slot :openSettings="openSettings"></slot>
    <div class="chatbot-radiolist">
      <div class="title" v-html="localSettings.title"></div>
      <v-radio-group disabled v-model="model">
        <v-radio v-for="option in localSettings.options" :key="option.id" :label="option.value" :value="option.value"></v-radio>
      </v-radio-group>
    </div>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import Settings from './Settings'

  export default {
    name: "ChatbotRadioList",
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
        model: null
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
  .title {
    text-align: center;
  }
  .chatbot-radiolist {
    display: block;
    margin-top: 20px;
  }
  .chatbot-radiolist .v-input {
    margin-top: 0 !important;
  }
  .chatbot-radiolist .v-messages {
    display: none;
  }

</style>

<style>
  .chatbot-radiolist .v-label,
  .chatbot-radiolist .v-icon  {
    color: #333 !important;
  }
</style>
