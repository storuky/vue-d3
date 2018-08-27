<template>
  <div class="editable">
    <div class="editable-placeholder" v-if="!content">Message</div>
    <div ref="editable" class="editable-input" contenteditable="true" @input="update"></div>
  </div>
</template>


<script>
  export default {
    name: "Editable",
    props: ['content'],
    mounted: function(){
      this.$refs.editable.innerText = this.content;
    },
    methods:{
      update: function(event){
        this.$emit('update', event.target.innerText);
      }
    }
  }
</script>

<style scoped>
  .editable {
    position: relative;
  }
  .editable-placeholder {
    position: absolute;
    top: 0;
    opacity: .6;
    font-style: italic;
  }
  .editable-input {
    position: relative;
  }
</style>
