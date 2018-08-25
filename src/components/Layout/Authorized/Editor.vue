<template>
  <Layout>
    <Header :title="activeProject.name" :tabs="activeProject.charts" v-model="activeChart" />
    <div class="work-area">
      <div class="grid-container">
        <Grid />
      </div>
    </div>
  </Layout>
</template>

<script>
  import Layout from './_Layout'
  import Header from './_Shared/Header'
  import Grid from './Editor/Grid'

  export default {
    name: "Editor",
    components: {
      Layout,
      Header,
      Grid
    },
    data () {
      return {
        activeChart: this.$route.params.chartId
      }
    },
    created () {
      this.fetchProject()
      this.fetchChart()
    },
    beforeRouteUpdate (to, from, next) {
      next()
      const chartId = to.params.chartId,
            projectId = to.params.projectId

      if (projectId != from.params.projectId) {
        this.fetchProject(projectId)
        this.fetchChart(chartId)
      } else {
        this.fetchChart(chartId)
      }
    },
    methods: {
      fetchChart() {
        this.$store.dispatch('fetchChart', this.chartId)
        this.activeChart = this.chartId
      },
      fetchProject() {
        this.$store.dispatch('fetchProject', this.projectId)
      }
    },
    computed: {
      activeProject () {
        return this.$store.getters.getActiveProject
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