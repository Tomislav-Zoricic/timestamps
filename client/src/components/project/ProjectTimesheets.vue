<template lang="html">
  <div class="">
    <li v-if="timeEntries" class="list-group-item" v-for="entry in timeEntries">
      <h4 class="list-group-item-heading">{{entry.firstName}}</h4>
      <p class="list-group-item-text">{{entry.lastName}}</p>
      <p class="list-group-item-text">{{entry.date}}</p>
      <p class="list-group-item-text">Rate: {{entry.rate}}</p>
      <p class="list-group-item-text">Amount: {{entry.amount}}</p>
      <p class="list-group-item-text">{{entry.taskName}}</p>
    </li>
    <li v-else>
      <div class="jumbotron">
        <h1 class="display-3">No timeentries available</h1>
        <p class="lead">
          Don't you worry, you'll be able to add them soon.
        </p>
      </div>
    </li>
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
          timeEntries: []
        }
      }
    }
  },

  computed: {
    timeEntries () {
      return this.$store.getters.timeEntries
    }
  },

  created  () {
    // Should be promise chained.
    fetchProject(this)
    let id = this.$route.params.id
    this.$store.dispatch('getTimeEntries', { id })
  }

}
</script>

<style lang="css">
</style>
