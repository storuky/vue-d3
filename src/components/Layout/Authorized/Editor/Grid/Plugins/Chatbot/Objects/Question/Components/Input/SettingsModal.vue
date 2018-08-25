<template>
  <Modal title="Input Settings" @submit="save()" @close="$emit('close')">
    <v-layout row>
      <v-flex xs8>
        <v-text-field type="text" v-model="localSettings.showCondition" label="Show Condition, default true" solo></v-text-field>
      </v-flex>
      
      <v-flex xs1></v-flex>

      <v-flex xs3>
        <v-text-field type="number" v-model="localSettings.width" label="Width, %"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs3>
        <v-select :items="items" label="Type"></v-select>
      </v-flex>

      <v-flex xs1></v-flex>

      <v-flex xs8>
        <v-text-field type="text" v-model="localSettings.placeholder" label="Placeholder"></v-text-field>
      </v-flex>
    </v-layout>

    <v-text-field solo type="text" v-model="localSettings.model" label="Model (for using in expressions)"></v-text-field>
  </Modal>
</template>

<script>
  export default {
    name: "InputSettingsModal",
    props: {
      settings: Object,
      onSave: Function,
    },
    data () {
      return {
        localSettings: {...this.settings},
        items: ['text', 'email', 'number']
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