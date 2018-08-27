<template>
  <Layout title="Profile" :tabs="tabs">
    <template slot="tabs-content" slot-scope="slotProps">
      <v-card-text>
        <v-tabs-items v-model="slotProps.activeTab">
          <v-tab-item>
            <h2>Information</h2>
            <ProfileInformation />
          </v-tab-item>
          <v-tab-item>
            <h2>Settings</h2>
            <ProfileSettings />
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </template>
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
      const tabs = ["Profile Information", "Settings"]
      return {
        tabs,
        activeTab: 0,
      }
    }
  }
</script>