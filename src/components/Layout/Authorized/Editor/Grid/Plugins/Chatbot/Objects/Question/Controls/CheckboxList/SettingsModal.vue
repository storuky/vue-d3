<template>
  <Modal title="CheckboxList Settings" @submit="save()" @close="$emit('close')">
    <v-layout row>
      <v-flex xs8>
        <v-text-field type="text" v-model="localSettings.title" label="Title"></v-text-field>
      </v-flex>
      <v-flex xs1></v-flex>

      <v-flex xs3>
        <v-text-field type="number" v-model="localSettings.width" label="Width, %"></v-text-field>
      </v-flex>
    </v-layout>

    <OptionsList v-model="localSettings.options" />
  </Modal>
</template>

<script>
  export default {
    name: "CheckboxListSettingsModal",
    props: {
      settings: Object,
      onSave: Function,
    },
    data () {
      const settings = {...this.settings}
      settings.options = (this.settings.options || []).map(option => {
        return {...option}
      })
      return {
        localSettings: settings
      }
    },
    methods: {
      addOption () {
        this.localSettings.options.push({id: Math.random()})
      },
      deleteOption (optionId) {
        this.localSettings.options = this.localSettings.options.filter(option => option.id != optionId)
      },
      save () {
        this.onSave(this.localSettings)
        this.$emit('close')
      }
    }
  }
</script>