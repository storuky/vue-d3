<template>
  <div @click="openSettings()" class="general-border gradient">
    <div class="general" :style="{backgroundImage: `url(${url})`}">
      
    </div>
  </div>
</template>

<script>
  import Settings from './Settings'
  export default {
    name: "AnalysisTools_General",
    props: {
      value: Object,
      size: Object
    },
    data () {
      const settings = {...this.value}

      return {
        localSettings: settings
      }
    },
    methods: {
      openSettings () {
        this.$modal.show(Settings, {
          settings: this.localSettings,
          onSave: (settings) => {
            this.localSettings = settings
            this.$emit("calcSize")
            this.$emit("input", this.localSettings)
          }
        }, {
          height: 'auto',
          scrollable: true,
          overlayClasses: ['object-editor-overlay'], transition: 'object-editor', name: 'object-editor',
        })
      }
    },
    computed: {
      url () {
        return this.localSettings.image ? this.localSettings.image.body.quad.url : ''
      }
    }
  }
</script>

<style scoped>
  .general-border {
    padding: 4px;
    width: 100%;
    height: 100%;
  }

  .general {
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    background-size: cover;
    background-position: center center;
  }
</style>
