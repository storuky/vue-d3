<template>
  <Layout title="Dashboard" :tabs="tabs">
    <template slot="tabs-content" slot-scope="slotProps">
      <v-card-text>
        <v-tabs-items v-model="slotProps.activeTab">
          <v-tab-item v-if="hasProjects" class="modal-to-page">
            <h2>Open Project</h2>
            <OpenProject />
          </v-tab-item>
          <v-tab-item class="modal-to-page">
            <h2>New Project</h2>
            <ProjectForm class="modal-to-page" />
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </template>
  </Layout>
</template>

<script>
  import Header from './_Shared/Header'
  import Layout from './_Layout'
  import OpenProject from './Project/OpenProject'
  import ProjectForm from './Project/ProjectForm'

  export default {
    name: 'Dashboard',
    components: {Layout, Header, OpenProject, ProjectForm},
    data () {
      const hasProjects = this.$store.getters.getCurrentUser.recent_projects.length != 0

      const tabs = []
      if (hasProjects) {
        tabs.push('Open Project')
      }
      
      tabs.push('New Project')

      return {
        hasProjects,
        tabs,
        activeTab: 0
      }
    },
    computed: {
      activeTabNum () {
        return this.tabs.findIndex(t => t.id == this.activeTab)
      }
    }
  }
</script>

<style>
  .modal-to-page {
    padding: 40px;
  }
  .modal-to-page .modal-footer button:first-child,
  .modal-to-page .close,
  .modal-to-page .modal-title {
    visibility: hidden;
  }
  .modal-to-page .modal {
    padding: 0;
  }
</style>