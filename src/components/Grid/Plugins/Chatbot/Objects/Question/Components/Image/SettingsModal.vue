<template>
  <div class="modal">
    <div class="close" @click="$emit('close')">
      <v-icon>close</v-icon>
    </div>
    <div class="modal-title">Image Settings</div>
    <div class="modal-body">
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

      <v-text-field type="text" v-model="localSettings.imageUrl" label="Url"></v-text-field>
    </div>

    <div class="modal-footer">
      <v-btn @click="$emit('close')">Cancel</v-btn>
      <v-btn color="primary" @click="save()">Save</v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ImageSettingsModal",
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