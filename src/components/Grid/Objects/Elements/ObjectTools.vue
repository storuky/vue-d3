<template>
  <div class="object-tools">
    <div class="object-tool">
      <v-icon>code</v-icon>
    </div>
    <div class="object-tool">
      <v-icon>delete</v-icon>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ObjectTools',
    props: {
      objectId: Number
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
    color: white;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    border-radius: 25px;
  }
  .object-tool i {
    font-size: 18px;
  }
</style>
