<template>
  <label class="uploader">
    <div class="uploader-section">
      <input class="uploader-input" type="file" @change="onFileChanged">
      <div class="uploader-background" v-if="localValue.body" :style="{backgroundImage: localValue.body ? `url(${localValue.body.quad.url})` : ''}"></div>
      <div class="uploader-placeholder" v-else>{{label || 'Upload'}}</div>
    </div>
  </label>
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
  }

  .uploader-input {
    display: none;
  }

  .uploader-section {
    border: 1px solid #ccc;
    cursor: pointer;
    width: 100%;
    height: 100%;
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
  }
</style>
