<template lang="html">
<div class="projects">
  <main-navbar></main-navbar>
  <div class="container">
    <div class="row">
      <div class="col-sm-4 col-sm-offset-2">
        <project-list :projects="projects"></project-list>
      </div>
      <div class="col-sm-4 col-sm-offset-2">
        <!-- display project info -->
        <router-view :activeProject="activeProject"></router-view>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import navbar from './../navbar/Navbar.vue'
import projectList from './ProjectList.vue'

export default {
  components: {
    'main-navbar': navbar,
    'project-list': projectList
  },

  computed: {
    projects () {
      return this.$store.getters.allProjects
    },
    activeProject () {
      return this.$store.getters.activeProject
    }
  },

  created () {
    this.$store.dispatch('getProjects')
  }
}
</script>

<style lang="scss">
</style>
