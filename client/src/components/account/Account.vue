<template lang="html">
  <div class="container">
    <jumbotron :user="user"></jumbotron>
    <data-form :user="user"></data-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import jumbotron from './Jumbotron.vue'
import dataForm from './Data.vue'

export default {
  components: {
    'jumbotron': jumbotron,
    'data-form': dataForm
  },

  computed: {
    ...mapGetters([
      'user'
    ])
  }
}
</script>

<style lang="css">
</style>
