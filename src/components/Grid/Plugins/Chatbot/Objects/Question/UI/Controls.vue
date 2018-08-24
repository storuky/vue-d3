<template>
  <draggable :options="{group}" v-model="localControls">
    <component @calcSize="$emit('calcSize')" class="component" :key="control.id" v-for="control in localControls" :is="control.type" :settings="control.settings"></component>
  </draggable>
</template>

<script>
  import * as d3 from 'd3'
  import draggable from 'vuedraggable'
  import ChatbotButton from '../Components/Button/index'
  import ChatbotSelect from '../Components/Select/index'
  import ChatbotInput from '../Components/Input/index'
  import ChatbotVideo from '../Components/Video/index'
  import ChatbotImage from '../Components/Image/index'
  import ChatbotCheckboxList from '../Components/CheckboxList/index'
  import ChatbotRadioList from '../Components/RadioList/index'

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
