<template>
  <Modal :showSubmit="showSubmit" title="New Project" submitBtnText="Create" @submit="create()" @close="$emit('close')">
    <v-text-field @keyup.enter.native="create()" type="text" v-model="settings.name" label="Project Name"></v-text-field>
    <div class="project-types">
      <div @click="settings.type = type.name" :class="{active: settings.type == type.name}" class="project-type" v-for="type in types" :key="type.name">
        {{type.title}}
      </div>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: 'NewProject',
    props: {},
    data () {
      return {
        types: [{
          name: 'analysis_tools',
          title: 'Analysis Tools'
        }, {
          name: 'chatbot',
          title: 'Chatbot'
        }],
        settings: {
          type: 'analysis_tools'
        }
      }
    },
    computed: {
      showSubmit () {
        return !!this.settings.name
      }
    },
    methods: {
      create () {
        const settings = {...this.settings}
        if (settings.name) {
          this.$emit('close')
        }
      }
    }
  }
</script>

<style>
  .project-types {
    display: flex;
    margin: 0 -10px;
  }
  .project-type {
    height: 80px;
    width: 100px;
    background: #e7e7e7;
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 14px;
    padding: 10px;
    font-weight: 500;
  }
  .project-type.active {
    background: #df4e9e;
    color: white;
  }
</style>
