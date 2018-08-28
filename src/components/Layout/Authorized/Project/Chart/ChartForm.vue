<template>
  <Modal :showSubmit="showSubmit" @submit="submit" :title="title" @close="$emit('close')">
    <v-text-field autofocus @keyup.enter.native="submit()" v-model="localSettings.name" label="Chart Name"></v-text-field>
  </Modal>
</template>

<script>
  import {Chart} from '../../../../../resources/index'
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
      submit () {
        if (this.localSettings.name) {
          let promise
          if (this.settings.id) {
            promise = Chart.update({id: this.localSettings.id}, {
              chart: this.localSettings
            })
          } else {
            promise = Chart.save({
              chart: this.localSettings
            })
          }

          promise.then(response => {
            this.$emit('close')
            if (this.onSubmit) this.onSubmit(response)
          })
        } 
      }
    }
  }
</script>