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
          <div v-if="item.list">
            <v-list-group prepend-icon="assignment" :value="false">
              <v-list-tile slot="activator">
                <v-list-tile-title>{{item.title}}</v-list-tile-title>
              </v-list-tile>

              <v-list-tile :class="{active: subitem.id == active}" :key="subitem.id" v-for="subitem in item.list" @click="subitem.callback ? subitem.callback(subitem.id) : null">
                <v-list-tile-title>{{subitem.title}}</v-list-tile-title>
              </v-list-tile>
            </v-list-group>
          </div>
          <div v-else>
            <v-list-tile @click="item.callback ? item.callback() : null">
              <v-list-tile-action>
                <v-icon>{{item.icon}}</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>{{item.title}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </div>
        </div>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
  import NewProject from '../Project/NewProject'

  export default {
    name: "Navigation",
    data () {
      return {
        items: [
          {
            icon: "add",
            title: "New Project",
            callback: this.openNewProject
          },
          {
            icon: "folder_open",
            title: "Open Project",
            callback: this.openProjectModal
          },
          {
            icon: "assignment",
            title: "Recent Projects",
            list: [
              {id: 1, title: "Project 1", callback: this.openProject},
              {id: 2, title: "Project 2", callback: this.openProject},
              {id: 3, title: "Project 3", callback: this.openProject},
            ]
          },
          {
            icon: 'account_circle',
            title: 'Profile',
            callback: this.openProfile
          }
        ],
        active: null
      }
    },
    methods: {
      openNewProject () {
        this.drawer = false
        this.$modal.show(NewProject, {}, {scrollable: true, height: "auto"})
      },
      openProfile () {
        this.drawer = false
        this.$router.push('/profile')
      },
      openProject (projectId) {
        this.drawer = false
        this.$router.push(`/project/${projectId}/chart/1`)
      }
    },
    computed: {
      drawer: {
        set(val) {
          this.$store.dispatch("setDrawer", val)
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
