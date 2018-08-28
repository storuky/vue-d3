<template>
  <Modal title="Answer Block Settings" @submit="save()" @close="$emit('close')">
    <v-text-field v-model="localSettings.context" label="Context"></v-text-field>
    <v-text-field v-model="localSettings.endpoint" label="Endpoint"></v-text-field>
  </Modal>
</template>

<script>
  export default {
    name: "ChatbotAnswerSettings",
    props: {
      settings: Object,
      onSave: Function
    },
    data () {
      const settings = {...this.settings}
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

<style scoped>
  
</style>
