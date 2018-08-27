<template>
  <div class="uploader">
    <label class="uploader-section">
      <input class="uploader-input" type="file" @change="onFileChanged">
      <div class="uploader-background" v-if="localValue.body" :style="{backgroundImage: localValue.body ? `url(${localValue.body.quad.url})` : ''}">
      </div>
      <div class="uploader-placeholder" v-else>{{label || 'Upload'}}</div>
    </label>
    <div @click="remove" class="uploader-delete" v-if="localValue.body">
      <v-icon>close</v-icon>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Uploader',
    props: {
      label: String,
      value: {
        type: Object,
        default: function () {
          return {}
        }
      },
    },
    data() {
      return {
        localValue: {...this.value},
        selectedFile: null
      }
    },
    methods: {
      remove () {
        this.localValue = {}
        this.$emit('input', this.localValue)
      },
      onFileChanged (event) {
        this.selectedFile = event.target.files[0]
        
        const formData = new FormData()
        formData.append('attachment', this.selectedFile, this.selectedFile.name)
        this.$http.post('/vulcan/v1/uploads/image', formData)
          .then(response => {
            this.localValue = response.body
            this.$emit('input', this.localValue)
          })
      }
    }
  }
</script>

<style>
  .uploader {
    width: 102px;
    height: 102px;
    display: block;
    position: relative;
  }

  .uploader-input {
    display: none;
  }

  .uploader-section {
    border: 1px solid #ccc;
    cursor: pointer;
    width: 100%;
    height: 100%;
    display: block;
    position: relative;
  }

  .uploader-background {
    background-size: cover;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .uploader-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f9f9f9;
  }

  .uploader-delete {
    position: absolute;
    right: 0;
    top: 0;
    width: 24px;
    height: 24px;
    background: #e04e9d;
    color: white;
    cursor: pointer;
  }

  .uploader-delete i {
    color: white !important;
  }
</style>
