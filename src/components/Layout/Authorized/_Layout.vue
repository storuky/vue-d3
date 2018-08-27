<template>
  <div :class="{'full-screen': fullWidth}">
    <v-navigation-drawer v-model="drawer" app>
      <Navigation />
    </v-navigation-drawer>
    <v-content class="layout">
      <modals-container></modals-container>
      <v-container fluid class="layout-content-wrapper">
        <!-- <router-view></router-view> -->
        <v-toolbar app color="white" tabs>
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

          <v-toolbar-title>{{title}}</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-menu bottom origin="center center" transition="scale-transition" v-if="more && more.length">
            <v-icon slot="activator">
              more_vert
            </v-icon>

            <v-list>
              <v-list-tile v-for="(item, i) in more" :key="i" @click="item.callback">
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>

          <v-tabs slot="extension" v-model="localActiveTab" align-with-title>
            <v-tabs-slider color="primary"></v-tabs-slider>
            <v-tab v-for="(tab, index) in localTabs" :key="index">
              <slot name="tab" :index="index" :tab="tab">
                  {{ tab }}
              </slot>
            </v-tab>
            <slot name="afterTabs"></slot>
          </v-tabs>
        </v-toolbar>

        <v-card class="layout-content">
          <slot name="tabs-content" :activeTab="localActiveTab"></slot>
        </v-card>

      </v-container>
    </v-content>
  </div>
</template>

<script>
  import Navigation from './_Shared/Navigation'
  export default {
    name: "Layout",
    components: {Navigation},
    props: {
      title: String,
      tabs: Array,
      activeTab: Number,
      more: Array,
      fullWidth: Boolean
    },
    data() {
      return {
        localActiveTab: 0,
        localTabs: this.tabs || [],
        drawer: false
      }
    },
    watch: {
      tabs () {
        this.localTabs = this.tabs
      },
      localActiveTab () {
        this.$emit('setActiveTab', this.localActiveTab)
      }
    }
  }
</script>

<style>
  .v-tabs__item {
    cursor: pointer;
    font-size: 13px;
    text-transform: capitalize;
  }

  .full-screen {
    width: 100%;
    height: 100%;
  }

  .full-screen .layout-content-wrapper {
    height: 100%;
    padding: 0;
  }

  .full-screen .layout-content {
    height: 100%;
    z-index: 1;
  }

  .full-screen .layout {
    height: 100%;
  }
</style>
