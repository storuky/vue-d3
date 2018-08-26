import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

const Project = Vue.resource('/vulcan/v1/projects{/id}', {}, {
  recent: { method: 'GET', url: '/vulcan/v1/projects/recent'}
})
const Chart = Vue.resource('/vulcan/v1/charts{/id}')
const CharObject = Vue.resource('/vulcan/v1/chart_objects{/id}')
const Connection = Vue.resource('/vulcan/v1/connections{/id}')
const User = Vue.resource('/vulcan/v1/users{/id}', {}, {
  current: { method: 'GET', url: '/vulcan/v1/users/current'}
})

export { Project, Chart, CharObject, Connection, User}