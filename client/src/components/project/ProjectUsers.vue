<template lang="html">
  <div class="">
    <li class="list-group-item" v-for="user in project.users">
      <h4 class="list-group-item-heading">
          <!-- NOTE some kind of filter for this stuff... -->
          {{user.firstName}} {{user.lastName}}
        </h4>
        <p class="list-group-item-text">{{user.email}}</p>
        <!-- NOTE remove plural if only one task -->
        <!-- NOTE Add task displays on click ? -->
        <p class="list-group-item-text">{{user.taskIds.length}} tasks</p>
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
