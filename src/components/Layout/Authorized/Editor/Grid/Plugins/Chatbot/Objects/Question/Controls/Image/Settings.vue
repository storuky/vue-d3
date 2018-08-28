<template>
  <Modal title="Image Settings" @submit="save()" @close="$emit('close')">
    <v-layout row>
      <v-flex xs8>
        <v-text-field type="text" v-model="localSettings.showCondition" label="Show Condition, default true" solo></v-text-field>
      </v-flex>
      <v-flex xs1></v-flex>

      <v-flex xs3>
        <v-text-field type="number" v-model="localSettings.width" label="Width, %"></v-text-field>
      </v-flex>
    </v-layout>
    
    <v-text-field type="text" v-model="localSettings.label" label="Label"></v-text-field>
    <Uploader label="Upload Image" v-model="localSettings.image" />
    <!-- <v-text-field type="text" v-model="localSettings.imageUrl" label="Url"></v-text-field> -->
  </Modal>
</template>

<script>
  export default {
    name: "ImageSettings",
    props: {
      settings: Object,
      onSave: Function,
    },
    data () {
      return {
        localSettings: {...this.settings}
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