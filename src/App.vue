<template>
  <v-app id="app" data-app light>
    <div class="spinner" v-if="!$store.getters.getCurrentUser">
      <atom-spinner :animation-duration="1000" :size="100" :color="'#df4e9e'"/>
    </div>
    <router-view v-if="$store.getters.getCurrentUser"></router-view>
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
  mounted () {
    User.current()
      .then(response => {
        this.$store.dispatch("setCurrentUser", response.body)
      })
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
  .work-area {
    position: absolute;
    left: 0;
    right: 0;
    top: 84px;
    bottom: 0;
    background: #f8f8f8;
    z-index: 2;
  }

  .wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    transition: .2s;
    overflow: hidden;
  }

  .grid-container {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    box-shadow: -1px 0px 10px 0 rgba(0, 0, 0, 0.12);
  }
</style>
