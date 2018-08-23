import 'normalize.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/dist/vuetify.min.css'
import 'roboto-fontface'
import './assets/css/Material.css'

import Vue from 'vue'
import Vuetify from 'vuetify'
import store from './store/index'
import VueResource from 'vue-resource'
import App from './App.vue'

Vue.use(VueResource)
Vue.use(Vuetify, {})

Vue.config.productionTip = false

new Vue({
  store: store,
  render: h => h(App)
}).$mount('#app')