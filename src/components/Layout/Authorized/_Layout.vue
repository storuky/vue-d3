<template>
  <div>
    <div class="wrapper">
      <slot></slot>
    </div>
    <Navigation />
    <modals-container></modals-container>
  </div>
</template>

<script>
  import Navigation from './_Shared/Navigation'
  export default {
    name: "Layout",
    components: {Navigation}
  }
</script>