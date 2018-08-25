<template>
  <Modal title="Answer Block Settings" @submit="save()" @close="$emit('close')">
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
    
    <OptionsList label="Answers" itemName="Answer" v-model="localSettings.answerVariants" />
  </Modal>
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
