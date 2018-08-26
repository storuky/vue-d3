<template>
  <div class="header">
    <v-toolbar
      color="white"
      tabs
    >
      <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
      <v-toolbar-title>{{title}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>

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

      <v-tabs v-if="localTabs.length" slot="extension" v-model="localTab" color="white" align-with-title>
        <v-tabs-slider color="primary"></v-tabs-slider>

        <v-tab v-for="tab in localTabs" :key="tab.id">
          <slot name="tab" :tab="tab">{{ tab.name }}</slot>
        </v-tab>

        <slot name="afterTabs"></slot>
      </v-tabs>
    </v-toolbar>
  </div>
</template>

<script>
  export default {
    name: "Header",
    props: {
      tabs: {
        type: Array,
        default: function () {
          return []
        }
      },
      value: String,
      title: String,
      more: Array
    },
    data () {
      return {
        localTab: 0,
        localTabs: this.tabs
      }
    },
    watch: {
      localTab () {
        if (this.localTabs[this.localTab])
          this.$emit('input', this.localTabs[this.localTab].id)
      },
      tabs () {
        this.localTabs = this.tabs
        this.setLocalTab()
      },
      value () {
        this.setLocalTab()
      }
    },
    methods: {
      setLocalTab () {
        this.localTab = this.tabs.findIndex(t => this.value == t.id)
      },
      toggleDrawer () {
        this.$store.dispatch('toggleDrawer')
      },
      deleteChart (chartId) {
        console.log(111)
        this.localTabs = this.localTabs.filter(chart => chart.id != chartId)
        console.log(this.localTabs)
      }
    }
  }
</script>

<style>
  .v-toolbar__content {
    max-height: 48px;
  }

  .v-tabs__item {
    color: #333;
  }

  .v-toolbar {
    box-shadow: 0 1px 10px 0 rgba(0, 0, 0, 0.21);
  }

  .v-tabs__container {
    height: 36px;
  }

  .v-tabs__div {
    text-transform: capitalize;
    font-size: 12px;
  }
  .v-toolbar__extension {
    max-height: 36px;
  }
</style>


<style scoped>
  .header {
    position: relative;
    z-index: 3;
  }
</style>
