<template lang="html">
<div class="project">
  <main-navbar></main-navbar>
  <div class="container">
    <div class="">
      <h1>{{project.data.name}}</h1>
      <p>Description: {{project.data.description}}</p>
      <p>Budget: {{project.data.budget}}</p>
    </div>
    <div class="">
      <ul class="nav nav-tabs">
        <!-- NOTE set active tab -->
        <li>
          <router-link :to="{ name: 'projectTasks' }">Tasks</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'projectUsers' }">Users</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'projectTimesheets' }">Timesheets</router-link>
        </li>
        <!-- NOTE Redirect if direct acces when there is no customer -->
        <li v-if="project.customer">
          <router-link :to="{ name: 'projectCustomer' }">Customer</router-link>
        </li>
      </ul>
      <router-view :project="project"></router-view>
    </div>
  </div>
</div>
</template>

<script>
import navbar from './../navbar/Navbar.vue'
import { fetchProject } from './../../utils/fetchService'

export default {
  components: {
    'main-navbar': navbar
  },

  computed: {
    project () {
      return this.$store.getters.project
    }
  },

  created () {
    fetchProject(this)
  }
}
</script>

<style lang="scss">
</style>
