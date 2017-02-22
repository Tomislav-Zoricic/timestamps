<template lang="html">
  <div class="">
    <li class="list-group-item" v-for="task in tasks">
      <h4 class="list-group-item-heading">{{task.name}}</h4>
        <p class="list-group-item-text">{{task.description}}</p>
        <p class="list-group-item-text">Rate: {{task.rate}}</p>
        <!-- NOTE Add user displays on click ? -->
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
          tasks: new Map()
        }
      }
    }
  },

  computed: {
    tasks () {
      // NOTE Find a nicer way to do this.
      return Array.from(this.project.tasks.values())
    }
  },

  created () {
    fetchProject(this)
  }
}
</script>

<style lang="css">
</style>
