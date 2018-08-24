<template>
  <div class="component-selector gradient" :style="{minWidth: data.size.width + 'px', minHeight: data.size.height + 'px'}">
    <div class="ll">
      <div @click="addComponent(component)" class="component-item" :key="component" v-for="component in data.components">
        {{component}}
      </div>
    </div>
  </div>
</template>

<script>
  import settings from '../../settings'

  export default {
    name: "ComponentSelector",
    props: {
      data: Object,
      default: Object
    },
    created () {
      if (this.data.components.length == 1) {
        this.addComponent(this.data.components[0])
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.$emit('calcSize')
      })
    },
    computed: {
      width () {
        return this.data.size.width || this.defaule.size.width
      },
      height () {
        return this.data.size.height || this.defaule.size.height
      }
    },
    methods: {
      addComponent (componentName) {
        this.$store.dispatch('createObject', {
          type: componentName,
          position: {
            x: this.data.position.x,
            y: this.data.position.y + this.data.size.height/2 - settings[componentName].size.height/2
          },
        }).then(res => {
          this.$nextTick(function () {
            const curve = this.$store.getters.getCurves(this.data.id)[0]
            this.$store.dispatch('removeCurve', {from: curve.fromLocal, to: this.data.id})
            this.$store.dispatch('createCurve', {from: curve.fromLocal, to: res.id})
            this.$store.dispatch('removeObject', this.data.id)
          })
        })
      }
    }
  }
</script>

<style scoped>
  .component-selector {
    border-radius: 20px;
    color: #333;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
    background: white;
    cursor: pointer;
    border: 3px solid #df4e9e;
    overflow: hidden;
  }

  .component-item {
    height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-bottom: 1px solid #e7e7e7;
    margin-top: -1px;
  }

  .component-item:last-child {
    border: none;
  }
</style>
