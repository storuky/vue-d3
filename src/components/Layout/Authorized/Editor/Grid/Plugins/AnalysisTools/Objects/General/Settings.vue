<template>
  <Modal title="General Object Settings" @submit="save()" @close="$emit('close')">
    <v-layout row>
      <v-flex xs3>
        <Uploader label="Image" v-model="localSettings.image" />
      </v-flex>
      <v-flex xs1></v-flex>
      <v-flex xs9>
        <v-text-field label="Title" v-model="localSettings.title" />
        <v-text-field style="margin-top: 0" label="Link" v-model="localSettings.link" />
      </v-flex>
    </v-layout>
    <div style="margin-top: 30px">
      <VueEditor v-model="localSettings.notes" />
      <OptionsList label="Addons" itemName="Addon" v-model="localSettings.addons" :dimension="2" />
    </div>
  </Modal>
</template>

<script>
  import { VueEditor } from 'vue2-editor'
  import VModal from 'vue-js-modal'

  export default {
    name: "GeneralSettings",
    props: {
      settings: Object,
      onSave: Function
    },
    components: {VueEditor},
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
