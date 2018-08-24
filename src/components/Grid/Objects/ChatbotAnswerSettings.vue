<template>
  <div class="modal">
    <div class="close" @click="$emit('close')">
      <v-icon>close</v-icon>
    </div>
    <div class="modal-title">Answer Block Settings</div>
    <div class="modal-body">
      <v-layout row>
        <v-flex xs5>
          <v-select v-model="localSettings.action" :items="items" label="Action" solo></v-select>
        </v-flex>
        <v-flex xs1></v-flex>
        <v-flex xs6>
          <div v-if="localSettings.action == 'Open Link'">
            <v-text-field v-model="localSettings.url" label="Url" solo></v-text-field>
          </div>
        </v-flex>
      </v-layout>

    </div>

    <div class="modal-footer">
      <v-btn @click="$emit('close')">Cancel</v-btn>
      <v-btn color="primary" @click="save()">Save</v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ChatbotAnswerSettings",
    props: {
      settings: Object
    },
    data () {
      const settings = {...this.settings}
      settings.action = settings.action || 'Default'
      return {
        localSettings: settings,
        items: ['Default', 'Open Link']
      }
    }
  }
</script>

<style scoped>

</style>
