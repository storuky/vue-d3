<template>
  <Modal :showSubmit="false" title="Open Project" submitBtnText="Open" @submit="create()" @close="$emit('close')">
    <div class="projects-list">
      <div class="projects-list-item" v-for="project in projects" :key="project.id">
        <Separator :label="project.name" />
        <div class="projects-list-item__charts">
          <div @click="open({chartId: chart.id, projectId: project.id})" class="projects-list-item__chart" v-for="chart in project.charts" :key="chart.id">
            {{chart.name}}
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
  import {Project} from '../../../../resources/index'

  export default {
    name: 'OpenProject',
    data () {
      return {
        projects: [],
        selectedProject: null
      }
    },
    created () {
      Project.query()
        .then(result => this.projects = result.body)
    },
    methods: {
      open ({chartId, projectId}) {
        this.$router.push({name: 'editor', params: {chartId, projectId}})
        this.$emit('close')
      }
    }
  }
</script>

<style>
  .projects-list {
    
  }

  .projects-list-item {
    padding: 10px;
    margin-bottom: 10px;
  }

  .projects-list-item__name {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .projects-list-item__charts {
    margin: 15px -5px;
  }

  .projects-list-item__chart {
    display: inline-block;
    margin: 5px;
    padding: 5px 10px;
    background: #535fa6;
    color: white;
    font-size: 11px;
    text-transform: uppercase;
    cursor: pointer;
    transition: .2s;
    border-radius: 3px;
  }

  .projects-list-item__chart:hover {
    filter: brightness(110%);
  }
</style>
