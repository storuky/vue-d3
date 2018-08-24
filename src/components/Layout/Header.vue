<template>
  <div class="header">
    <v-toolbar
      color="white"
      tabs
    >
      <v-toolbar-side-icon @click.stop="toggleDrawer"></v-toolbar-side-icon>
      <v-toolbar-title>Ulf</v-toolbar-title>

      <v-tabs
        slot="extension"
        v-model="tab"
        color="white"
        align-with-title
      >
        <v-tabs-slider color="primary"></v-tabs-slider>

        <v-tab
          v-for="item in items"
          :key="item"
        >
          {{ item }}
        </v-tab>
      </v-tabs>
    </v-toolbar>
  </div>
</template>

<script>
  export default {
    name: "Header",
    data () {
      return {
        tab: 'web',
        items: [
          'Visual Bot'
        ]
      }
    },
    methods: {
      toggleDrawer () {
        this.$store.dispatch('toggleDrawer')
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
