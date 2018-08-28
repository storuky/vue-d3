<template>
  <v-app id="app" data-app light>
    <div class="spinner" v-if="!loaded">
      <atom-spinner :animation-duration="1000" :size="100" :color="'#df4e9e'"/>
    </div>
    <router-view v-if="loaded"></router-view>
  </v-app>
</template>

<script>
import {AtomSpinner} from 'epic-spinners'
import {User} from './resources/index'
export default {
  name: 'app',
  components: {
    AtomSpinner
  },
  computed: {
    loaded () {
      return this.$store.getters['application/isLoaded']
    }
  }
}
</script>

<style scoped>
  .spinner {
    text-align: center;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
</style>


<style>
  * {
    box-sizing: border-box;
  }
</style>
