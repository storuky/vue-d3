<template>
  <div class="component-selector-border" :style="{minWidth: size.width + 'px', minHeight: size.height + 'px'}">
    <div class="component-selector gradient">
      <div class="ll">
        <div @click="addComponent(component)" class="component-item" :key="component" v-for="component in localValue.components">
          {{settings[component].name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import settings from '../../settings'

  export default {
    name: "ComponentSelector",
    props: {
      value: Object,
      size: Object,
      position: Object,
      componentId: Number
    },
    data () {
      return {
        settings,
        localValue: {...this.value}
      }
    },
    mounted () {
      this.$nextTick(function () {
        if (this.localValue.components && this.localValue.components.length == 1) {
          this.addComponent(this.localValue.components[0])
        }
        this.$emit('calcSize')
      })
    },
    methods: {
      addComponent (componentName) {
        this.$store.dispatch('createObject', {
          type: componentName,
          position: {
            x: this.position.x,
            y: this.position.y + this.size.height/2 - settings[componentName].size.height/2
          },
        }).then(res => {
          this.$nextTick(function () {
            const curve = this.$store.getters.getCurves(this.componentId)[0]

            if (curve) {
              this.$store.dispatch('createCurve', {
                from: curve.fromLocal,
                to: res.id
              })
            }
            this.$store.dispatch('removeObject', this.componentId)
          })
        })
      }
    }
  }
</script>

<style scoped>
  .component-selector-border {
    background: #df4e9e;
    border-radius: 20px;
    padding: 3px;
  }
  .component-selector {
    border-radius: 18px;
    color: #333;
    font-weight: bold;
    font-size: 16px;
    text-align: center;
    background: white;
    cursor: pointer;

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
