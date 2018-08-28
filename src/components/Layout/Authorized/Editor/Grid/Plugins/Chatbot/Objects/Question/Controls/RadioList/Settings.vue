<template>
  <Modal title="RadioList Settings" @submit="save()" @close="$emit('close')">
    <v-layout row>
      <v-flex xs8>
        <v-text-field type="text" v-model="localSettings.showCondition" label="Show Condition, default true" solo></v-text-field>
      </v-flex>
      <v-flex xs1></v-flex>

      <v-flex xs3>
        <v-text-field type="number" v-model="localSettings.width" label="Width, %"></v-text-field>
      </v-flex>
    </v-layout>
    
    <v-text-field type="text" v-model="localSettings.title" label="Title"></v-text-field>

    <OptionsList v-model="localSettings.options" />
  </Modal>
</template>

<script>
  export default {
    name: "RadioListSettings",
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
        localSettings: {...settings}
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