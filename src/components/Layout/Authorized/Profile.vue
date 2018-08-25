<template>
  <Layout>
    <Header title="Profile" :tabs="tabs" v-model="activeTab" />
    <div class="page-tabs-content">
      <v-tabs-items v-model="activeTabNum">
        <v-tab-item>
          <div class="page">
            Profile Information
          </div>
        </v-tab-item>
        <v-tab-item>
          <div class="page">
            Settings
          </div>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </Layout>
</template>

<script>
  import Header from './_Shared/Header'
  import Layout from './_Layout'

  export default {
    name: "Profile",
    components: {Layout, Header},
    data () {
      const tabs = [{name: "Profile Information", id: "1"}, {name: "Settings", id: "2"}]
      return {
        tabs,
        activeTab: '1',
      }
    },
    computed: {
      activeTabNum () {
        return this.tabs.findIndex(t => t.id == this.activeTab)
      }
    }
  }
</script>

<style scoped>
  
</style>