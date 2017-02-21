<template lang="html">
  <div class="">
    <li class="list-group-item" v-for="task in project.tasks">
      <h4 class="list-group-item-heading">{{task.name}}</h4>
        <p class="list-group-item-text">{{task.description}}</p>
        <p class="list-group-item-text">Rate: {{task.rate}}</p>
        <!-- NOTE Add user displays on click ? -->
        <p class="list-group-item-text">
          {{task.userIds.length}} users are working on it.
        </p>
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
          data: {},
          tasks: [],
          users: [],
          customer: {}
        }
      }
    }
  },

  created () {
    fetchProject(this)
  }
}
</script>

<style lang="css">
</style>
