<template>
  <div class="modal">
    <div class="close" @click="$emit('close')">
      <v-icon>close</v-icon>
    </div>
    <div class="modal-title">Select Settings</div>
    <div class="modal-body">
      <v-layout row>
        <v-flex xs9>
        </v-flex>
        <v-flex xs3>
          <v-text-field type="number" v-model="localSettings.width" label="Width, %"></v-text-field>
        </v-flex>
      </v-layout>

      <div class="section">
        <div class="section-label">Options</div>
        <div class="form-row" v-for="option in localSettings.options" :key="option.id">
          <v-layout row>
            <v-flex xs12>
              <v-text-field v-model="option.text" label="Option" solo></v-text-field>
            </v-flex>
            <v-flex xs0 class="text-right">
              <v-icon class="delete" @click="deleteOption(option.id)">close</v-icon>
            </v-flex>
          </v-layout>
        </div>
        <div class="add" @click="addOption">Add Option</div>
      </div>
    </div>

    <div class="modal-footer">
      <v-btn @click="$emit('close')">Cancel</v-btn>
      <v-btn color="primary" @click="save()">Save</v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SelectSettingsModal",
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
        localSettings: settings
      }
    },
    methods: {
      addOption () {
        this.localSettings.options.push({id: Math.random()})
      },
      deleteOption (optionId) {
        this.localSettings.options = this.localSettings.options.filter(option => option.id != optionId)
      },
      save () {
        this.onSave(this.localSettings)
        this.$emit('close')
      }
    }
  }
</script>