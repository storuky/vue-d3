<template>
  <Modal :showSubmit="showSubmit" @submit="save" :title="title" @close="$emit('close')">
    <v-text-field autofocus @keyup.enter.native="save()" v-model="localSettings.name" label="Chart Name"></v-text-field>
  </Modal>
</template>

<script>
  export default {
    name: "ChartSettings",
    props: {
      title: String,
      settings: Object,
      onSubmit: Function
    },
    data () {
      return {
        localSettings: {...this.settings || {}}
      }
    },
    computed: {
      showSubmit () {
        return !!this.localSettings.name
      }
    },
    methods: {
      save () {
        if (this.localSettings.name) {
          this.onSubmit(this.localSettings)
            .then(e => this.$emit('close'))
        } 
      }
    }
  }
</script>