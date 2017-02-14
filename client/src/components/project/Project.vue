<template lang="html">
<div class="project">
  <main-navbar></main-navbar>
</div>
</template>

<script>
import navbar from './../navbar/Navbar.vue'

export default {
  components: {
    'main-navbar': navbar
  },

  // NOTE check if project with this id is already in store.
  mounted () {
    let id = this.$route.params.id
    this.$store.dispatch('getProject', { id })
  }
}
</script>

<style lang="scss">
</style>
