import 'normalize.css'

import Vue from 'vue'
import store from './store/index'
import VueResource from 'vue-resource'
import App from './App.vue'

Vue.use(VueResource)

Vue.config.productionTip = false

new Vue({
  store: store,
  render: h => h(App)
}).$mount('#app')