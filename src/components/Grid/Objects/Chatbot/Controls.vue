<template>
  <draggable :options="{group}" v-model="localControls">
    <component @calcSize="$emit('calcSize')" class="component" :key="control.id" v-for="control in localControls" :is="control.type" :settings="control.settings"></component>
  </draggable>
</template>

<script>
  import * as d3 from 'd3'
  import draggable from 'vuedraggable'
  import ChatbotButton from './Button'
  import ChatbotSelect from './Select'
  import ChatbotInput from './Input'
  import ChatbotVideo from './Video'
  import ChatbotImage from './Image'
  import ChatbotCheckboxList from './CheckboxList'
  import ChatbotRadioList from './RadioList'

  export default {
    name: "Controls",
    props: {
      group: String,
      controls: Array,
      className: String
    },
    data () {
      return {
        localControls: this.controls
      }
    },
    components: {
      draggable,
      ChatbotButton,
      ChatbotSelect,
      ChatbotInput,
      ChatbotVideo,
      ChatbotImage,
      ChatbotCheckboxList,
      ChatbotRadioList
    }
  }
</script>

<style scoped>
  .question-body .component {
    margin: 20px 0;
  }
</style>
