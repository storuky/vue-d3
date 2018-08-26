<template>
  
</template>


<script>
  export default {
    name: "Root",
    created () {
      const projects = this.$store.getters.getCurrentUser.recent_projects
      if (projects.length) {
        const lastProject = projects[0]
        const projectId = lastProject.id,
              chartId = lastProject.charts.length ? lastProject.charts[0].id : 0
        this.$router.push({name: "editor", params: {projectId, chartId}})
      } else {
        console.log("No projects")
      }
    }
  }
</script>