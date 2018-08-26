<template>
  <div class="navigation">
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://avatars2.githubusercontent.com/u/3216491?s=460&v=4">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>Steve Schofield</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>


        <div :key="item.id" v-for="item in items">
          <div v-if="(itemSlots[item.slot] || item).list">
            <v-list-group prepend-icon="assignment" :value="false">
              <v-list-tile slot="activator">
                <v-list-tile-title>{{(itemSlots[item.slot] || item).title}}</v-list-tile-title>
              </v-list-tile>

              <v-list-tile :class="{active: subitem.id == active}" :key="subitem.id" v-for="subitem in (itemSlots[item.slot] || item).list" @click="subitem.callback ? subitem.callback(subitem.id) : null">
                <v-list-tile-title>{{subitem.title || subitem.name}}</v-list-tile-title>
              </v-list-tile>
            </v-list-group>
          </div>
          <div v-else>
            <v-list-tile @click="(itemSlots[item.slot] || item).callback ? (itemSlots[item.slot] || item).callback() : null">
              <v-list-tile-action>
                <v-icon>{{item.icon}}</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{item.title || item.name}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </div>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
  import ProjectForm from '../Project/ProjectForm'
  import OpenProject from '../Project/OpenProject'
  import {Project} from '../../../../resources'

  export default {
    name: 'Navigation',
    created () {
      this.updateRecentProjectsList()
    },
    data () {
      return {
        items: [
          {
            icon: 'add',
            title: 'New Project',
            callback: this.openNewProject
          },
          {
            icon: 'folder_open',
            title: 'Open Project',
            callback: this.openProjectModal
          },
          {slot: 'recentProjects'},
          {
            icon: 'account_circle',
            title: 'Profile',
            callback: this.openProfile
          },
          {
            icon: 'exit_to_app',
            title: 'Sign Out',
            callback: this.signOut
          }
        ],
        itemSlots: {
          recentProjects: {
            icon: 'assignment',
            title: 'Recent Projects'
          },
        },
        active: null
      }
    },
    methods: {
      updateRecentProjectsList () {
        Project.recent().then(response => {
          this.itemSlots.recentProjects.list = response.data.map(project => {
            return {
              ...project,
              callback: () => {this.openProject(project)}
            }
          })
        })
      },
      openProjectModal () {
        this.drawer = false
        this.$modal.show(OpenProject, {}, {scrollable: true, height: 'auto'})
      },
      openNewProject () {
        this.drawer = false
        this.$modal.show(ProjectForm, {}, {scrollable: true, height: 'auto'})
      },
      openProfile () {
        this.drawer = false
        this.$router.push('/profile')
      },
      openProject (project) {
        this.drawer = false
        const chartId = project.charts[0] ? project.charts[0].id : 0,
              projectId = project.id
        this.$router.push({name: 'editor', params: {chartId, projectId}})
      },
      signOut () {
        this.drawer = false
        this.$http.delete('/vulcan/v1/auth/logout')
          .then(response => {
            this.$store.dispatch('setCurrentUser', null)
            this.$router.push({name: 'signIn'})
          })
      }
    },
    computed: {
      drawer: {
        set(val) {
          this.$store.dispatch('setDrawer', val)
        },
        get() {
          return this.$store.getters.getDrawer()
        }
      }
    }
  }
</script>

<style>
  .navigation .v-list__group__items > .active {
    background: #df4e9e;
    color: white;
  }
</style>
