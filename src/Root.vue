<template>
  <Layout class="root-page">
    <Header title="Vulcan" :tabs="tabs" v-model="activeTab" />
    <div class="page-tabs-content page-overflow">
      <v-tabs-items v-model="activeTabNum">
        <v-tab-item v-if="tabs[0].id == '1'">
          <div class="page hide-controls">
            <OpenProject />
          </div>
        </v-tab-item>
        <v-tab-item>
          <div class="page hide-cancel">
            <ProjectForm title="New Project" />
          </div>
        </v-tab-item>
      </v-tabs-items>
    </div>
    <!-- <div class="page-overflow">
      <div class="page hide-controls">
      </div>
    </div> -->
  </Layout>
</template>

<script>
  import Header from './components/Layout/Authorized/_Shared/Header'
  import Layout from './components/Layout/Authorized/_Layout'
  import OpenProject from './components/Layout/Authorized/Project/OpenProject'
  import ProjectForm from './components/Layout/Authorized/Project/ProjectForm'

  export default {
    name: 'Root',
    components: {Layout, Header, OpenProject, ProjectForm},
    data () {
      const hasProjects = this.$store.getters.getCurrentUser.recent_projects.length != 0

      const tabs = []
      if (hasProjects) {
        tabs.push({name: 'Open Project', id: '1'})
      }
      
      tabs.push({name: 'New Project', id: '2'})

      return {
        hasProjects,
        tabs,
        activeTab: tabs[0].id
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
  .root-page .hide-cancel .modal-footer button:first-child,
  .root-page .hide-cancel .close {
    visibility: hidden;
  }
</style>