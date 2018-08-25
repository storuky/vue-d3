<template>
  <Modal :showSubmit="showSubmit" title="New Project" submitBtnText="Create" @submit="create()" @close="$emit('close')">
    <v-text-field autofocus @keyup.enter.native="create()" type="text" v-model="settings.name" label="Project Name"></v-text-field>
    <div class="project-types">
      <div @click="settings.type = type.name" :class="{active: settings.type == type.name}" class="project-type" v-for="type in types" :key="type.name">
        {{type.title}}
      </div>
    </div>
  </Modal>
</template>

<script>
  import {Project} from '../../../../resources/index'

  export default {
    name: 'NewProject',
    props: {},
    data () {
      return {
        types: [{
          name: 'AnalysisTools',
          title: 'Analysis Tools'
        }, {
          name: 'Chatbot',
          title: 'Chatbot'
        }],
        settings: {
          type: 'AnalysisTools'
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
        if (this.settings.name) {
          Project.save({project: this.settings})
            .then(res => {
              this.$emit('close')
              const project = res.body
              this.$router.push(`/project/${project.id}/chart/${project.charts[0].id}`)
            })
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
    user-select: none;
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
