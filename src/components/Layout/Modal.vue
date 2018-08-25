<template>
  <div class="modal">
    <div class="close" @click="$emit('close')">
      <v-icon>close</v-icon>
    </div>
    <div class="modal-title">{{title}}</div>
    <div class="modal-body">
      <slot ref="slot"></slot>
    </div>

    <div class="modal-footer" v-if="showCancel || showSubmit">
      <v-btn v-if="showCancel" @click="$emit('close')">Cancel</v-btn>
      <v-btn v-if="showSubmit" color="primary" @click="$emit('submit')">{{submitBtnText || 'Save'}}</v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Modal",
    props: {
      title: String,
      submitBtnText: String,
      showSubmit: {
        type: Boolean,
        default: true
      },
      showCancel: {
        type: Boolean,
        default: true
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
    top: 84px;
    bottom: 0;
    left: auto;
    width: 33%;
    min-width: 470px;
    min-height: 0 !important;
    box-shadow: 0px 5px 8px rgba(0,0,0,.24);
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
    height: calc(100% - 84px) !important;
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
