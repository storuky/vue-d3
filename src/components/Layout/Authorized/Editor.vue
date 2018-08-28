<template>
  <Layout v-if="activeProject && activeChart" :activeTab="activeTab" :fullWidth="true" :more="moreMenu" :title="activeProject.name" :tabs="tabs" @setActiveTab="setActiveChart">
    <template slot="tabs-content">
      <div class="work-area">
        <div class="grid-container">
          <Grid v-if="activeChart.id == chartId" />
        </div>
      </div>
    </template>
    <template slot="tab" slot-scope="slotProps">
      {{slotProps.tab}}
      <span class="chart-actions">
        <v-icon style="font-size: 14px" @click.stop="editChartModal(slotProps.index)">settings</v-icon>
        <v-icon @click.stop="deleteChart(slotProps.index)">close</v-icon>
      </span>
    </template>
    <template slot="afterTabs">
      <div class="v-tabs__div">
        <a class="v-tabs__item add-chart" @click="newChartModal()">
          + Add Chart
        </a>
      </div>
    </template>
  </Layout>
</template>

<script>
  import Layout from './_Layout'
  import Header from './_Shared/Header'
  import Grid from './Editor/Grid'
  import {Project} from '../../../resources'
  import ChartForm from './Project/Chart/ChartForm'
  import ProjectForm from './Project/ProjectForm'
  import {Chart} from '../../../resources/index'

  export default {
    name: 'Editor',
    components: {
      Layout,
      Header,
      Grid
    },
    data () {
      return {
        activeTab: null,
        moreMenu: [
          {
            title: 'Edit Project',
            callback: ()=>{
              this.$modal
                .show(ProjectForm, {
                  title: 'Edit Project',
                  settings: this.activeProject,
                  onSubmit: response => this.activeProject = response
                }, { scrollable: true, height: 'auto' })
            }
          },
          {
            title: 'Delete Project', callback: ()=>{
              if (confirm('Are You Sure?')) {
                Project.delete({id: this.projectId})
                  .then(response => this.$router.push({name: 'dashboard'}))
              }
            }
          },
        ]
      }
    },
    mounted () {
      this.fetchProject(this.projectId)
          .then(project => this.fetchChart(this.chartId))
    },
    methods: {
      fetchChart(chartId) {
        Chart.get({id: chartId})
          .then(response => {
            this.activeChart = response.body
            this.activeTab = this.activeProject.charts.findIndex(chart => chartId == chart.id)
          }, err => this.$router.push({name: 'dashboard'}))
      },
      fetchProject(projectId) {
        return new Promise((resolve, reject) => {
          Project
            .get({id: projectId})
            .then(response => {
              this.activeProject = response.body
              resolve(response)
            })
        })
      },
      deleteChart (tabIndex) {
        if (confirm('Are you sure?')) {
          const chartId = this.activeProject.charts[tabIndex].id
          Chart.delete({id: chartId})
            .then(response => {
              this.activeProject.charts = response.data
              if (this.chartId == chartId) {
                this.activeChart = this.activeProject.charts[this.activeProject.charts.length-1].id
              }
            })
        }
      },
      editChartModal (index) {
        this.$modal.show(ChartForm, {
          title: 'Edit Chart',
          settings: this.activeProject.charts[index],
          onSubmit: (response) => {
            const chartId = response.body.id
            const index = this.activeProject.charts.findIndex(chart => chart.id == chartId)
            this.activeProject.charts.splice(index, 1, response.body)
          }
        }, {scrollable: true, height: 'auto'})
      },
      newChartModal () {
        this.$modal.show(ChartForm, {
          title: 'New Chart',
          settings: {
            project_id: this.activeProject.id
          },
          onSubmit: (response) => {
            const chartId = response.body.id
            this.activeProject.charts.push(response.body)
            this.activeTab = this.activeProject.charts.length - 1
          }
        }, {scrollable: true, height: 'auto'})
      },
      setActiveChart (index) {
        const chartId = this.activeProject.charts[index].id
        this.fetchChart(chartId)
      }
    },
    computed: {
      activeChart: {
        get () {
          return this.$store.getters['chart/getActive']
        },
        set (value) {
          this.$store.dispatch('chart/setActive', value)
        }
      },
      activeProject: {
        get () {
          return this.$store.getters['project/getActive']
        },
        set (value) {
          this.$store.dispatch('project/setActive', value)
        }
      },
      projectId () {
        return this.$route.params.projectId
      },
      chartId () {
        return this.$route.params.chartId
      },
      tabs () {
        return this.activeProject ? this.activeProject.charts.map(chart => chart.name) : []
      },
    },
    beforeRouteUpdate (to, from, next) {
      next()
      const chartId = to.params.chartId,
            projectId = to.params.projectId

      this.$modal.hide('object-editor')

      if (projectId != from.params.projectId) {
        this.fetchProject(projectId)
        this.fetchChart(chartId)
      } else {
        this.fetchChart(chartId)
      }
    },
    watch: {
      activeChart (val) {
        this.$router.push(`/project/${this.projectId}/chart/${val.id}`)
      }
    }
  }
</script>

<style>
  .add-chart {
    color: #df4e9e;
    font-weight: bold;
    font-size: 14px;
    opacity: 1 !important;
  }

  .chart-actions {
    position: relative;
    left: 5px;
    white-space: nowrap;
  }
  .chart-actions i {
    font-size: 16px;
    vertical-align: middle;
  }
  .chart-actions i:hover {
    color: #333;
  }

  .work-area {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #f8f8f8;
    z-index: 2;
  }

  .grid-container {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    box-shadow: -1px 0px 10px 0 rgba(0, 0, 0, 0.12);
  }
</style>
