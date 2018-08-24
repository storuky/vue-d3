<template>
  <div class="modal">
    <div class="close" @click="$emit('close')">
      <v-icon>close</v-icon>
    </div>
    <div class="modal-title">Answer Block Settings</div>
    <div class="modal-body">
      <v-layout row :key="variant.id" v-for="variant in localSettings.answerVariants">
        <v-flex xs11>
          <v-text-field v-model="variant.text" label="Answer" solo></v-text-field>
        </v-flex>
        <v-flex xs1>
          <div class="delete-variant" @click="deleteVariant(variant.id)">
            <v-icon>delete</v-icon>
          </div>
        </v-flex>
      </v-layout>
      <div @click="addVariant()" class="component-settings">Add Answer Variant</div>
      <v-layout row>
        <v-flex xs5>
          <v-select v-model="localSettings.action" :items="items" label="Action"></v-select>
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
      settings: Object,
      onSave: Function
    },
    data () {
      const settings = {...this.settings}
      settings.action = settings.action || 'Default'
      settings.answerVariants = settings.answerVariants || []
      settings.answerVariants = settings.answerVariants.map(av => {
        return {...av}
      })
      return {
        localSettings: settings,
        items: ['Default', 'Open Link']
      }
    },
    methods: {
      addVariant () {
        this.localSettings.answerVariants.push({id: Math.random()})
      },
      deleteVariant (variantId) {
        this.localSettings.answerVariants = this.localSettings.answerVariants.filter(av => av.id != variantId)
      },
      save () {
        this.onSave(this.localSettings)
        this.$emit('close')
      }
    }
  }
</script>

<style scoped>
  .component-settings {
    margin-bottom: 20px;
  }

  .delete-variant {
    padding: 10px;
    cursor: pointer;
  }
</style>
