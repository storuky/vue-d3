<template>
  <Modal :showSubmit="showSubmit" :title="title" :submitBtnText="submitBtnText" @submit="create()" @close="$emit('close')">
    <v-text-field autofocus @keyup.enter.native="create()" type="text" v-model="localSettings.name" label="Project Name"></v-text-field>
    <div class="project-types" v-if="!this.settings">
      <div @click="localSettings.type = type.name" :class="{active: localSettings.type == type.name}" class="project-type" v-for="type in types" :key="type.name">
        {{type.title}}
      </div>
    </div>
  </Modal>
</template>

<script>
  import {Project} from '../../../../resources/index'

  export default {
    name: 'NewProject',
    props: {
      settings: Object,
      onSubmit: Function
    },
    data () {
      return {
        title: this.settings ? 'Edit Project' : 'New Project',
        types: [{
          name: 'AnalysisTools',
          title: 'Analysis Tools'
        }, {
          name: 'Chatbot',
          title: 'Chatbot'
        }],
        submitBtnText: this.settings ? 'Save' : 'Create',
        localSettings: {...this.settings || {type: 'AnalysisTools'}}
      }
    },
    computed: {
      showSubmit () {
        return !!this.localSettings.name
      }
    },
    methods: {
      create () {
        if (this.localSettings.name) {
          if (this.settings) {
            Project.update({id: this.localSettings.id}, {project: this.localSettings})
              .then(res => {
                this.$emit('close')
                this.localSettings = res.body
                this.onSubmit(this.localSettings)
              })
          } else {
            Project.save({project: this.localSettings})
              .then(res => {
                this.$emit('close')
                const project = res.body
                this.$router.push(`/project/${project.id}/chart/${project.charts[0].id}`)
              })
          }
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
