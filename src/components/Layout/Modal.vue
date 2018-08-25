<template>
  <modals-container></modals-container>
</template>

<script>
  export default {
    name: "ObjectEditor",
    data () {
      return {
        left: window.innerWidth - 320
      }
    },
    methods: {
      close () {
        
      }
    }
  }
</script>

<style>
  .modal {
    padding: 20px 20px 0 20px;
  }
  .modal-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .close {
    float: right;
    cursor: pointer;
  }
  .label {
    padding: 18px 5px 18px 0;
    display: inline-block;
  }

  .modal-footer {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .modal-body {
    padding-bottom: 76px;
  }

  .modal-footer .v-btn {
    margin: 0;
  }

  .delete {
    padding: 15px 5px;
    cursor: pointer;
  }

  .v--modal-overlay.scrollable .v--modal-box {
    margin: 50px 0;
  }

  div[data-modal="object-editor"] {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    left: auto;
    width: 33%;
    min-width: 470px;
    min-height: 0 !important;
    box-shadow: 0px 0px 8px rgba(0,0,0,.24);
    background: none;
  }
  div[data-modal="object-editor"] .v--modal {
    position: absolute;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    top: 0 !important;
    width: 100% !important;
    margin: 0 !important;
    border-radius: 0 !important;
    overflow: auto;
  }
  div[data-modal="object-editor"] .v--modal-background-click {
    padding-bottom: 0;
  }

  div[data-modal="object-editor"] .modal {
    padding: 20px 20px 0 20px;
    position: relative;
    background: white;
    min-height: 100%;
  }
</style>
