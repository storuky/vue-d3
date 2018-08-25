<template>
  <Modal title="Select Settings" @submit="save()" @close="$emit('close')">
    <v-layout row>
      <v-flex xs8>
        <v-text-field type="text" v-model="localSettings.showCondition" label="Show Condition, default true" solo></v-text-field>
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
  import OptionsList from '../../UI/OptionsList'

  export default {
    name: "SelectSettingsModal",
    props: {
      settings: Object,
      onSave: Function,
    },
    components: {OptionsList},
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
      save () {
        this.onSave(this.localSettings)
        this.$emit('close')
      }
    }
  }
</script>