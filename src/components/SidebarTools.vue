<template>
  <div class="sidebar-tools">
    <v-btn fab small color="primary">
      <v-icon>add</v-icon>
    </v-btn>
  </div>
</template>

<script>
  export default {
    name: "SidebarTools"
  }
</script>

<style>
  .sidebar-tools .v-btn {
    margin: 5px;
  }
</style>


<style scoped>
  .sidebar-tools {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 50px;
    padding: 20px 0;
  }
</style>
