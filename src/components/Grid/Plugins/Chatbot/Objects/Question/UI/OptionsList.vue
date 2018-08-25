<template>
  <div class="section">
    <div class="section-label">Options</div>
    <draggable v-model="localOptions">
      <div class="form-row" v-for="option in localOptions" :key="option.id">
        <v-layout row>
          <v-flex xs11>
            <v-text-field v-model="option.text" label="Option"></v-text-field>
          </v-flex>
          <v-flex xs1 class="text-right">
            <v-icon class="delete" @click="deleteOption(option.id)">delete</v-icon>
          </v-flex>
        </v-layout>
      </div>
    </draggable>
    <div class="add" @click="addOption">Add Option</div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'

  export default {
    name: 'OptionsList',
    props: {
      options: Array
    },
    components: {draggable},
    data () {
      return {
        localOptions: this.options
      }
    },
    methods: {
      addOption () {
        this.localOptions.push({id: Math.random()})
      },
      deleteOption (optionId) {
        this.localOptions = this.localOptions.filter(option => option.id != optionId)
      }
    }
  }
</script>

<style scoped>
  .form-row {
    height: 52px;
    margin: 20px 0;
  }
</style>
