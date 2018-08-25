import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

const Project = Vue.resource("/vulcan/v1/projects{/id}")
const Chart = Vue.resource("/vulcan/v1/charts{/id}", {}, {
  createObject: { method: 'POST', url: '/vulcan/v1/charts{/id}/create_object'}
})
const CharObject = Vue.resource("/vulcan/v1/chart_objects{/id}")

export { Project, Chart, CharObject}