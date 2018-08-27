<template>
  <div class="editable">
    <div ref="editable" :placeholder="placeholder" class="editable-input" contenteditable="true" @input="update"></div>
  </div>
</template>


<script>
  export default {
    name: "Editable",
    props: ['content', 'placeholder'],
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
  .editable-input {
    min-height: 20px;
  }
  .editable-input[contenteditable=true]:empty:before{
    opacity: .6;
    font-style: italic;
    float: left;
    content: attr(placeholder);
    display: block; /* For Firefox */
  }
</style>
