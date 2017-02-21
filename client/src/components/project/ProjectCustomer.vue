<template lang="html">
  <div v-if="customer" class="well">
    <!-- NOTE user here computed full name property or some kind of filter -->
    <p>{{customer.firstName}} {{customer.lastName}}</p>
    <p>{{customer.company}}</p>
    <p>{{customer.address}}, {{customer.city}} {{customer.state}} {{customer.country}}</p>
    <p>{{customer.phoneNumber}}</p>
  </div>
  <div v-else>
    <div class="jumbotron">
      <h1 class="display-3">Aww SHOOT !!!</h1>
      <p class="lead">
        You shouldn't have landed here :)
      </p>
    </div>
  </div>
</template>

<script>
import { fetchProject } from './../../utils/fetchService'
export default {
  props: {
    project: {
      type: Object,
      default () {
        return {
          data: {},
          tasks: [],
          users: [],
          customer: {}
        }
      }
    }
  },

  computed: {
    customer () { return this.project.customer }
  },

  created () {
    fetchProject(this)
  }
}
</script>

<style lang="css">
</style>
