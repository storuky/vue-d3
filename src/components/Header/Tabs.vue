<template>
  <v-tabs
    slot="extension"
    v-model="tab"
    color="white"
    align-with-title
  >
    <v-tabs-slider color="v-pink"></v-tabs-slider>

    <v-tab
      v-for="item in items"
      :key="item"
    >
      {{ item }}
    </v-tab>
  </v-tabs>
</template>

<script>
  export default {
    name: "HeaderTabs",
    data () {
      return {
        tab: 'web',
        items: [
          'web', 'shopping', 'videos', 'images', 'news',
        ]
      }
    }
  }
</script>

<style scoped>

</style>
