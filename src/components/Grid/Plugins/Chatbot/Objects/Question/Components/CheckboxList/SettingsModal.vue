<template>
  <div class="modal">
    <div class="close" @click="$emit('close')">
      <v-icon>close</v-icon>
    </div>
    <div class="modal-title">ChecboxList Settings</div>
    <div class="modal-body">
      <v-layout row>
        <v-flex xs8>
          <v-text-field type="text" v-model="localSettings.title" label="Title"></v-text-field>
        </v-flex>
        <v-flex xs1></v-flex>

        <v-flex xs3>
          <v-text-field type="number" v-model="localSettings.width" label="Width, %"></v-text-field>
        </v-flex>
      </v-layout>

      <OptionsList :options="localSettings.options" />      
    </div>

    <div class="modal-footer">
      <v-btn @click="$emit('close')">Cancel</v-btn>
      <v-btn color="primary" @click="save()">Save</v-btn>
    </div>
  </div>
</template>

<script>
  import OptionsList from '../../UI/OptionsList'

  export default {
    name: "CheckboxListSettingsModal",
    props: {
      settings: Object,
      onSave: Function,
    },
    components: {
      OptionsList
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