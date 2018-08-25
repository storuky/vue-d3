<template>
  <div class="separator">
    <div class="separator-label">{{label}}</div>
    <div class="separator-actions">
      <div v-if="actions.indexOf('add')!=-1" class="separator-action add" @click="$emit('add')">
        <v-icon>add</v-icon>
      </div>
      <div v-if="actions.indexOf('settings')!=-1" class="separator-action settings" @click="$emit('settings')">
        <v-icon>settings</v-icon>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Separator",
    props: {
      label: String,
      actions: Array
    }
  }
</script>

<style scope>
  .separator {
    border-top: 1px solid #e7e7e7;
    margin: 5px 0;
  }

  .separator-label,
  .separator-actions {
    margin-top: -10px;
  }

  .separator-label {
    float: left;
    background: white;
    color: #7b7b7b;
    margin-left: 20px;
    padding: 0 8px;
  }
  .separator-actions {
    float: right;
    margin-right: 12px;
    padding: 0 8px;
    background: white;
  }

  .separator-action {
    height: 20px;
    width: 20px;
    border-radius: 15px;
    text-align: center;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .separator-action .v-icon {
    font-size: 15px;
  }
  .separator-action.add .v-icon {
    color: white;
  }
  .separator-action.add {
    background: #6eccb9;
    border: 1px solid #76bdaf;
  }
  .separator-action.settings .v-icon{
    color: #333;
  }
  .separator-action.settings {
    background: white;
    border: 1px solid #acafae;
  }
</style>
