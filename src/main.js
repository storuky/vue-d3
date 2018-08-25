import 'normalize.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/dist/vuetify.min.css'
import 'roboto-fontface'
import './assets/css/Material.css'
import './assets/css/styles.css'

import Vue from 'vue'
import Vuetify from 'vuetify'
import store from './store/index'
import VueResource from 'vue-resource'
import VModal from 'vue-js-modal'
import App from './App.vue'
import './components/Global'


Vue.use(VueResource)
Vue.use(Vuetify, {
  theme: {
    primary: "#df4e9e",
    success: "#6eccb9"
  }
})
Vue.use(VModal, { dynamic: true })

Vue.config.productionTip = false

new Vue({
  store: store,
  render: h => h(App)
}).$mount('#app')