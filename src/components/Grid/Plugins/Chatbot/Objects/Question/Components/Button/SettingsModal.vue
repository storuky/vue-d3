<template>
  <Modal title="Button Settings" @submit="save()" @close="$emit('close')">
    <v-layout row>
      <v-flex xs8>
        <v-text-field type="text" v-model="localSettings.showCondition" label="Show Condition, default true" solo></v-text-field>
      </v-flex>
      <v-flex xs1></v-flex>
      <v-flex xs3>
        <v-text-field type="number" v-model="localSettings.width" label="Width, %"></v-text-field>
      </v-flex>
    </v-layout>
    
    <v-text-field v-model="localSettings.label" label="Label"></v-text-field>

    <div class="section">
      <div class="section-label">Action</div>
      <div class="form-row" v-for="action in localSettings.actions" :key="action.id">
        <v-layout row>
          <v-flex>
            <v-text-field v-model="action.answer" label="Send Answer"></v-text-field>
          </v-flex>
          <v-flex xs0 class="space">
          </v-flex>
          <v-flex>
            <v-text-field v-model="action.if" label="If Expression" solo></v-text-field>
          </v-flex>
          <v-flex xs0 class="text-right">
            <v-icon class="delete" @click="deleteAction(action.id)">delete</v-icon>
          </v-flex>
        </v-layout>
      </div>
      <div class="add" @click="addAction">Add Action</div>
    </div>
  </Modal>
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