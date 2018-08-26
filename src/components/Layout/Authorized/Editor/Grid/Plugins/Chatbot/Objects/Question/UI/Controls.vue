<template>
  <draggable :options="{group}" v-model="localControls">
    <component @calcSize="$emit('calcSize')" class="component" :key="control.id" v-for="control in localControls" :is="control.type" v-model="control.settings">
      <template slot-scope="slotProps">
        <Separator @delete="deleteControl(control.id)" @settings="slotProps.openSettings" :label="control.name" :actions="['settings', 'delete']" />
      </template>
    </component>
  </draggable>
</template>

<script>
  import * as d3 from 'd3'
  import ChatbotButton from '../Controls/Button/index'
  import ChatbotSelect from '../Controls/Select/index'
  import ChatbotInput from '../Controls/Input/index'
  import ChatbotVideo from '../Controls/Video/index'
  import ChatbotImage from '../Controls/Image/index'
  import ChatbotCheckboxList from '../Controls/CheckboxList/index'
  import ChatbotRadioList from '../Controls/RadioList/index'

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
    margin: 10px 0;
    min-height: 35px;
  }
</style>
