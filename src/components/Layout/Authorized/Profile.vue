<template>
  <Layout>
    <Header title="Profile" :tabs="tabs" v-model="activeTab" />
    <div class="page-tabs-content">
      <v-tabs-items v-model="activeTabNum">
        <v-tab-item>
          <div class="page">
            <ProfileInformation />
          </div>
        </v-tab-item>
        <v-tab-item>
          <div class="page">
            <ProfileSettings />
          </div>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </Layout>
</template>

<script>
  import Header from './_Shared/Header'
  import Layout from './_Layout'
  import ProfileInformation from './Profile/ProfileInformation'
  import ProfileSettings from './Profile/ProfileSettings'

  export default {
    name: "Profile",
    components: {Layout, Header, ProfileInformation, ProfileSettings},
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