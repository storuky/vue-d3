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

        <v-list-group prepend-icon="assignment" :value="false">
          <v-list-tile slot="activator">
            <v-list-tile-title>Projects</v-list-tile-title>
          </v-list-tile>

          <v-list-tile :class="{active: i == active}" :key="i" v-for="i in 5" @click="active = i">
            <v-list-tile-title>Projects {{i}}</v-list-tile-title>
          </v-list-tile>

          <v-list-tile @click="">
            <v-list-tile-title>+ New Project</v-list-tile-title>
          </v-list-tile>
        </v-list-group>


        <v-list-tile :key="item.id" v-for="item in items" @click="">
          <v-list-tile-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{item.title}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
  export default {
    name: "Navigation",
    data () {
      return {
        items: [
          {icon: 'account_circle', title: 'Profile'}
        ],
        active: null
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
    /* position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 9; */
  }
</style>
