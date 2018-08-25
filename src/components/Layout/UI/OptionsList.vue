<template>
  <div class="section">
    <div class="section-label">{{label || 'Options'}}</div>
    <draggable v-model="localValue">
      <div class="form-row" v-for="(option, index) in localValue" :key="option.id">
        <v-layout row>
          <v-flex xs11>
            <v-text-field :autofocus="!option.text" @keyup.enter.native="index == localValue.length - 1 ? addOption() : null" v-model="option.text" :label="itemName || 'Option'"></v-text-field>
          </v-flex>
          <v-flex xs1 class="text-right">
            <v-icon class="delete" @click="deleteOption(option.id)">delete</v-icon>
          </v-flex>
        </v-layout>
      </div>
    </draggable>
    <div class="add" @click="addOption">Add {{itemName || 'Option'}}</div>
  </div>
</template>

<script>
  export default {
    name: 'OptionsList',
    props: {
      value: Array,
      label: String,
      itemName: String
    },
    data () {
      return {
        localValue: [...this.value]
      }
    },
    methods: {
      addOption () {
        this.localValue.push({id: Math.random()})
        this.$emit('input', this.localValue)
      },
      deleteOption (optionId) {
        this.localValue = this.localValue.filter(option => option.id != optionId)
        this.$emit('input', this.localValue)
      }
    }
  }
</script>

<style scoped>
  .form-row {
    height: 52px;
    margin: 20px 0;
  }
  .section {
    margin: 10px 0;
  }
</style>
