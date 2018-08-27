<template>
  <Layout :fullWidth="true" :more="moreMenu" :title="activeProject.name" :tabs="tabs" @setActiveTab="setActiveChart">
    <template slot="tabs-content">
      <div class="work-area">
        <div class="grid-container">
          <Grid v-if="chartTransform && $store.getters.getActiveChart.id == chartId" :transform="chartTransform" />
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
  import ChartSettings from './Project/Chart/ChartSettings'
  import {Project} from '../../../resources'
  import ProjectForm from './Project/ProjectForm'
  import {Chart} from '../../../resources/index'

  export default {
    name: "Editor",
    components: {
      Layout,
      Header,
      Grid
    },
    data () {
      return {
        activeTab: null,
        activeChart: this.$route.params.chartId,
        transform: {},
        chartTransform: false,
        moreMenu: [
          {
            title: "Edit Project",
            callback: ()=>{
              this.$modal.show(ProjectForm, {
                title: "Edit Project",
                settings: this.activeProject,
                onSubmit: (res) => {this.activeProject = res}
              }, {scrollable: true, height: "auto"})
            }
          },
          {
            title: "Delete Project", callback: ()=>{
              if (confirm("Are You Sure?")) {
                Project.delete({id: this.$route.params.projectId})
                  .then(response => {
                    this.$router.push({name: "root"})
                  })
              }
            }
          },
        ]
      }
    },
    created () {
      const chartId = this.$route.params.chartId,
            projectId = this.$route.params.projectId

      this.fetchProject(projectId)
      this.fetchChart(chartId)
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
    methods: {
      deleteChart (chartId) {
        if (confirm("Are you sure?")) {
          Chart.delete({id: chartId})
            .then(response => {
              this.activeProject.charts = response.data
              if (this.$route.params.chartId == chartId) {
                this.activeChart = this.activeProject.charts[this.activeProject.charts.length-1].id
              }
            })
        }
      },
      editChartModal (index) {
        this.$modal.show(ChartSettings, {
          title: "Edit Chart",
          settings: this.activeProject.charts[index],
          onSubmit: (chartParams) => {
            const projectId = this.$route.params.projectId
            return Chart.update({id: chartParams.id}, {chart: {...chartParams, project_id: projectId}})
              .then(response => {
                const chartId = response.body.id
                const index = this.activeProject.charts.findIndex(chart => chart.id == chartId)
                this.activeProject.charts.splice(index, 1, response.body)
              })
          }
        }, {scrollable: true, height: "auto"})
      },
      newChartModal () {
        this.$modal.show(ChartSettings, {
          title: "New Chart",
          onSubmit: (chartParams) => {
            const projectId = this.$route.params.projectId
            return Chart.save({chart: {...chartParams, project_id: projectId}})
              .then(response => {
                const chartId = response.body.id
                this.activeProject.charts.push(response.body)
                this.activeChart = chartId
              })
          }
        }, {scrollable: true, height: "auto"})
      },
      fetchChart(chartId) {
        this.chartTransform = null
        Chart.get({id: chartId})
          .then(response => {
            this.$store.commit('setChart', response.body)
            this.$store.commit('setObjectsList', response.body.objects)
            this.$store.commit('setCurvesList', response.body.connections)
            this.chartTransform = response.data.options.transform || {x: 0, y: 0, k: 1}
            this.activeChart = response.body.id
          }, err => {
            this.$router.push({name: "root"})
          })

      },
      fetchProject(projectId) {
        this.$store.dispatch('fetchProject', projectId)
      },
      setActiveChart (val) {
        console.log(val)
        const project = this.$store.getters.getActiveProject
        this.activeChart = project && project.charts ? project.charts[val].id : null
      }
    },
    computed: {
      tabs () {
        return this.activeProject && this.activeProject.charts ? this.activeProject.charts.map(e => e.name) : []
      },
      activeProject: {
        get () {
          return this.$store.getters.getActiveProject
        },
        set (val) {
          this.$store.dispatch('setActiveProject', val)
        }
      },
      chartId () {
        return this.$route.params.chartId
      },
      projectId () {
        return this.$route.params.projectId
      },
    },
    watch: {
      activeChart (val) {
        this.$router.push(`/project/${this.projectId}/chart/${val}`)
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
