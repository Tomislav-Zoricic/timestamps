<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import store from './vuex/store'

export default {
  store,
  name: 'App'
}
</script>

<style lang="scss">
body {
  @import 'scss/variables';
  width: 100%;
  height: 100%;
}
</style>
