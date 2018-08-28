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
    },
    created () {
      // this.$emit('close')
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

  .v--modal-overlay.object-editor-overlay {
    bottom: 0;
    box-shadow: 0 5px 8px rgba(0,0,0,.24);
    left: auto;
    min-height: 0 !important;
    min-width: 470px;
    position: absolute !important;
    right: 0;
    top: 0 !important;
    width: 33% !important;
    z-index: 2 !important;
  }
  .v--modal-overlay.object-editor-overlay .v--modal {
    position: absolute;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    top: 0 !important;
    width: 100% !important;
    margin: 0 !important;
    border-radius: 0 !important;
    overflow: auto;
    height: 100% !important;
  }
  .v--modal-overlay.object-editor-overlay .v--modal-background-click {
    padding-bottom: 0;
  }

  .v--modal-overlay.object-editor-overlay .modal {
    padding: 20px 20px 0 20px;
    position: relative;
    background: white;
    min-height: 100%;
  }

  .v--modal-overlay.object-editor-overlay.overlay-fade-enter {
    transition: all .3s ease-out;
    transition-delay: .3s;
    right: -400px;
  }
  .v--modal-overlay.object-editor-overlay.overlay-fade-leave-active {
    transition: all .3s ease-out;
    right: -400px;
  }

  @media screen and (max-width: 600px) {
    .v--modal-box {
      width: 100% !important;
      top: 0 !important;
      bottom: 0;
      position: absolute !important;
      left: 0 !important;
      margin: 0 !important;
      overflow: auto !important;
      border-radius: 0;
      -webkit-overflow-scrolling: touch;
    }

    .v--modal-overlay .v--modal-background-click {
      padding: 0;
    }

    .modal {
      min-height: 100%;
      position: relative;
    }

    .modal-footer {
      padding: 10px 0;
      position: relative;
    }

    .modal-body {
      padding-bottom: 10px;
    }

    .v--modal-overlay.object-editor-overlay {
      width: 100% !important;
      position: fixed !important;
      min-width: 0 !important;
    }
  }
</style>
