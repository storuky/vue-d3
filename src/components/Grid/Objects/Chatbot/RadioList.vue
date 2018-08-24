<template>
  <div @click="openSettings()" class="chatbot-radiolist" :style="{width: (localSettings.width || 100) + '%'}">
    <div v-if="!localSettings.options || localSettings.options.length == 0" class="component-settings">Checkbox List Settings</div>
    <v-radio-group disabled v-model="model">
      <v-radio v-for="option in localSettings.options" :key="option.id" :label="option.text" :value="option.text"></v-radio>
    </v-radio-group>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  import RadioListSettingsModal from '../../../modals/ControlSettings/RadioList'

  export default {
    name: "ChatbotRadioList",
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
        model: null
      }
    },
    methods: {
      openSettings () {
        this.$modal.show(RadioListSettingsModal, {
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
  .chatbot-radiolist {
    display: block;
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
