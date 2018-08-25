<template>
  <v-app id="app" data-app light>
    <div class="wrapper">
      <Header />
      <div class="work-area">
        <div class="grid-container">
          <Grid />
        </div>
        <Modal />
      </div>
    </div>
    <Navigation />
  </v-app>
</template>

<script>
import Grid from './components/Grid'
import Header from './components/Layout/Header'
import Navigation from './components/Layout/Navigation'
import Modal from './components/Layout/Modal'

export default {
  name: 'app',
  components: {
    Grid,
    Header,
    Navigation,
    Modal
  }
}
</script>

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
