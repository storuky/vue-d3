<template>
  <div class="navigation">
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
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

              <v-list-tile :class="{active: subitem.id == active}" :key="subitem.id" v-for="subitem in item.list" @click="active = subitem.id">
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
  import NewProject from './Project/NewProject'

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
            title: "Open Project"
          },
          {
            icon: "assignment",
            title: "Recent Projects",
            list: [
              {id: 1, title: "Project 1"},
              {id: 2, title: "Project 2"},
              {id: 3, title: "Project 3"},
            ]
          },
          {
            icon: 'account_circle',
            title: 'Profile'
          }
        ],
        active: null
      }
    },
    methods: {
      openNewProject () {
        this.drawer = false
        this.$modal.show(NewProject, {}, {scrollable: true, height: "auto"})
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
