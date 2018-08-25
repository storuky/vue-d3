<template>
  <Modal :showSubmit="showSubmit" title="New Project" submitBtnText="Create" @submit="create()" @close="$emit('close')">
    <v-layout row>
      <v-flex>
        <v-text-field @keyup.enter.native="create()" type="text" v-model="settings.name" label="Project Name"></v-text-field>
      </v-flex>
    </v-layout>
  </Modal>
</template>

<script>
  export default {
    name: "NewProject",
    props: {},
    data () {
      return {
        settings: {}
      }
    },
    computed: {
      showSubmit () {
        return !!this.settings.name
      }
    },
    methods: {
      create () {
        const settings = {...this.settings}
        if (settings.name) {
          this.$emit('close')
        }
      }
    }
  }
</script>