<template>
  <div class="modal">
    <div class="close" @click="$emit('close')">
      <v-icon>close</v-icon>
    </div>
    <div class="modal-title">Select Component</div>
    
    <div class="modal-body">
      <div class="controls-list">
        <div :class="{selected: selectedControl && selectedControl.type == control.type}" @click="setSelectedControl(control)" class="controls-list-item" v-for="control in controls" :key="control.name">
          {{control.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ControlsSelector",
    props: {
      controls: Array,
      onSave: Function
    },
    data () {
      return {
        selectedControl: this.selectedControl
      }
    },
    methods: {
      setSelectedControl (control) {
        this.selectedControl = control
        this.save()
      },
      save () {
        this.onSave(this.selectedControl)
        this.$emit('close')
      }
    }
  }
</script>

<style scoped>
  .controls-list {
    display: flex;
    justify-content: space-between;
  }

  .controls-list-item {
    margin: 10px;
    width: 100px;
    height: 100px;
    background: #e7e7e7;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    cursor: pointer;
  }
  .controls-list-item.selected {
    background: #6eccb9;
    color: white;
  }
</style>
