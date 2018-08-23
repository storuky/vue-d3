<template>
  <div>
    <v-btn color="success">{{settings.settings.states[0].label}}</v-btn>
  </div>
</template>

<script>
  export default {
    name: "ChatbotInput",
    props: {
      settings: Object
    }
  }
</script>

<style>

</style>
