<template>
  <div class="object-tools">
    <div v-if="settings.has.settings" class="object-tool" @click="$emit('openSettings')">
      <v-icon>code</v-icon>
    </div>
    <div class="object-tool" @click="$emit('deleteObject')">
      <v-icon>delete</v-icon>
    </div>
  </div>
</template>

<script>
  import * as d3 from 'd3'
  export default {
    name: 'ObjectTools',
    props: {
      settings: Object,
      objectId: Number
    },
    mounted () {
      d3.select(this.$el).on('mousedown', () => d3.event.stopPropagation())
    }
  }
</script>

<style scoped>
  .object-tools {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  .object-tool {
    background: #e44e9d;
    margin-left: 10px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    border-radius: 25px;
    cursor: pointer;
  }
  .object-tool i {
    color: white;
    font-size: 18px;
  }
</style>
