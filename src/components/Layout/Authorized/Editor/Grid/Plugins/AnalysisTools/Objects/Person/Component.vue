<template>
  <div @click="openSettings" class="person-border gradient" :style="{width: size.width + 'px', height: size.height + 'px'}">
    <div class="person">
      <div class="avatar" :style="{backgroundImage: `url(${localSettings.image ? localSettings.image.body.quad.url : ''})`}"></div>
    </div>
  </div>
</template>

<script>
  import Settings from './Settings'

  export default {
    name: "AnalysisTools_Person",
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
  .person-border {
    display: block;
    box-sizing: border-box;
    border-radius: 1000px;
    padding: 4px;
    cursor: pointer;
  }
  .person {
    text-align: center;
    width: 100%;
    height: 100%;
  }

  .avatar {
    border-radius: 1000px;
    background: white;
    background-size: cover;
    display: inline-block;
    height: 100%;
    width: 100%;
    background-position: center center;
  }
</style>
