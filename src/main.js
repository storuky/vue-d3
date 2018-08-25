import 'normalize.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/dist/vuetify.min.css'
import 'roboto-fontface'
import './assets/css/Material.css'
import './assets/css/styles.css'

import Vue from 'vue'
import Vuetify from 'vuetify'
import VModal from 'vue-js-modal'

Vue.use(Vuetify, {
  theme: {
    primary: "#df4e9e",
    success: "#6eccb9"
  }
})

Vue.use(VModal, { dynamic: true })

Vue.config.productionTip = false

import store from './store/index'
import router from './router/index'
import App from './App.vue'
import './components/Global'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')