<template>
  <div class="modal">
    <div class="close" @click="$emit('close')">
      <v-icon>close</v-icon>
    </div>
    <div class="modal-title">Button Settings</div>
    <div class="modal-body">
      <v-layout row>
        <v-flex xs9>
          <v-text-field v-model="localSettings.label" label="Label"></v-text-field>
        </v-flex>
        <v-flex xs1></v-flex>
        <v-flex xs3>
          <v-text-field type="number" v-model="localSettings.width" label="Width, %"></v-text-field>
        </v-flex>
      </v-layout>

      <div class="section">
        <div class="section-label">Action</div>
        <div class="form-row" v-for="action in localSettings.actions" :key="action.id">
          <v-layout row wrap>
            <v-flex xs0>
              <span class="label">Send</span>
            </v-flex>
            <v-flex>
              <v-text-field v-model="action.answer" label="Answer" solo></v-text-field>
            </v-flex>
            <v-flex xs0 class="space">
            </v-flex>
            <v-flex xs0>
              <span class="label">If</span>
            </v-flex>
            <v-flex>
              <v-text-field v-model="action.if" label="Expression" solo></v-text-field>
            </v-flex>
            <v-flex xs0 class="text-right">
              <v-icon class="delete" @click="deleteAction(action.id)">close</v-icon>
            </v-flex>
          </v-layout>
        </div>
        <div class="add" @click="addAction">Add Action</div>
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
    name: "ButtonSettingsModal",
    props: {
      settings: Object,
      onSave: Function,
    },
    data () {
      const settings = {...this.settings}
      settings.actions = (this.settings.actions || []).map(section => {
        return {...section}
      })
      return {
        localSettings: settings
      }
    },
    methods: {
      addAction () {
        this.localSettings.actions.push({id: Math.random()})
      },
      deleteAction (actionId) {
        this.actions = this.localSettings.actions.filter(action => action.id != actionId)
      },
      save () {
        this.onSave(this.localSettings)
        this.$emit('close')
      }
    }
  }
</script>