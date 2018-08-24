<template>
  <div class="modal">
    <div class="close" @click="$emit('close')">
      <v-icon>close</v-icon>
    </div>
    <div class="modal-title">Button Settings</div>

    <v-layout row>
      <v-flex xs9>
        <v-text-field v-model="settings.label" label="Label"></v-text-field>
      </v-flex>
      <v-flex xs1></v-flex>
      <v-flex xs3>
        <v-text-field type="number" v-model="settings.width" label="Width, %"></v-text-field>
      </v-flex>
    </v-layout>

    <div class="section">
      <div class="section-label">Action</div>
      <div class="form-row" v-for="action in actions" :key="action.id">
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

    <div class="modal-footer">
      <v-btn @click="$emit('close')">Cancel</v-btn>
      <v-btn color="v-pink" @click="save()">Save</v-btn>
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
      if (!this.settings.actions) {
        this.settings.actions = []
      }
      return {
        actions: this.settings.actions //|| [{id: Math.random()}]
      }
    },
    methods: {
      addAction () {
        this.actions.push({id: Math.random()})
      },
      deleteAction (actionId) {
        this.actions = this.actions.filter(action => action.id != actionId)
      },
      save () {
        this.onSave(this.settings)
        this.$emit('close')
      }
    }
  }
</script>

<style scoped>
  .modal {
    padding: 20px 20px 0 20px;
  }
  .modal-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .close {
    float: right;
    cursor: pointer;
  }
  .label {
    padding: 18px 5px 18px 0;
    display: inline-block;
  }

  .modal-footer {
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
  }

  .modal-footer .v-btn {
    margin: 0;
  }

  .delete {
    padding: 15px 5px;
    cursor: pointer;
  }
</style>
