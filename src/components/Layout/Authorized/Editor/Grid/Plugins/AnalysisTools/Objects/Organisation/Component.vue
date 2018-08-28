<template>
  <div @click="openSettings" class="organisation-border gradient" :style="{width: size.width + 'px', height: size.height + 'px'}">
    <div class="organisation" :style="{backgroundImage: `url(${localSettings.image ? localSettings.image.body.quad.url : ''})`}">
    </div>
  </div>
</template>

<script>
  import Settings from './Settings'
  export default {
    name: "AnalysisTools_Organisation",
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
    }
  }
</script>

<style scoped>
  .organisation-border {
    padding: 4px;
    cursor: pointer;
  }

  .organisation {
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-size: cover;
    background-position: center center;
  }
</style>
