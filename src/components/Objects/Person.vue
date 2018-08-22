<template>
  <div class="person-border" :style="{width: data.size.width + 'px', height: data.size.height + 'px'}">
    <div class="person">
      <div class="avatar">
        <In />
        <Out :objectId="data.id" />
      </div>
      <div class="ribbon">{{data.info.title}}</div>
    </div>
  </div>
</template>

<script>
  import In from './Elements/In'
  import Out from './Elements/Out'

  export default {
    name: 'Person',
    props: {
      data: Object
    },
    components: {In, Out}
  }
</script>

<style scoped>
  .person-border {
    display: block;
    box-sizing: border-box;
    background: #00a956;
    background: -moz-linear-gradient(left, #00a956 0%, #0159a6 100%);
    background: -webkit-linear-gradient(left, #00a956 0%,#0159a6 100%);
    background: linear-gradient(to right, #00a956 0%,#0159a6 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00a956', endColorstr='#0159a6',GradientType=1 );
    border-radius: 100px;
  }
  .person {
    position: relative;
    text-align: center;
    width: 100%;
    height: 100%;
  }

  .avatar {
    border-radius: 50px;
    background: #e7e7e7;
    background-size: cover;
    display: inline-block;
    height: calc(100% - 8px);
    width: calc(100% - 8px);
    margin: 4px;
  }

  .ribbon {
    white-space: nowrap;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    text-transform: uppercase;
    font-size: 12px;
    margin-top: 7px;
    font-weight: 500;
    color: #444;
  }
</style>
