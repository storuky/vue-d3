<template>
  <draggable :options="{group}" v-model="localControls">
    <component @calcSize="$emit('calcSize')" class="component" :key="control.id" v-for="control in localControls" :is="control.type" :settings="control.settings">
      <template slot-scope="slotProps">
        <Separator @delete="deleteControl(control.id)" @settings="slotProps.openSettings" :label="control.name" :actions="['settings', 'delete']" />
      </template>
    </component>
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
  import Separator from '../UI/Separator'

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
    methods: {
      deleteControl: function (controlId) {
        const index = this.localControls.findIndex(lc => lc.id == controlId)
        this.localControls.splice(index, 1)
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
      ChatbotRadioList,
      Separator
    }
  }
</script>

<style scoped>
  .question-body .component {
    margin: 10px 0;
    min-height: 35px;
  }
</style>
