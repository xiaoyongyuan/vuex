<template>
  <div id="app">
    <router-link to='/page1'>操作</router-link>
    <router-link to='/page2'>图表</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  },

}
</script>

<style scoped>
  #app a{
    display: inline-block;
    width: 100px;
  }
</style>
