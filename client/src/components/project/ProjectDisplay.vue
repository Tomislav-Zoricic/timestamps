<template lang="html">
  <div class="project-display">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">
          <router-link :to="{ name: 'project', params: { id: data.id }}">
              {{ data.name }}
          </router-link>
        </h3>
      </div>
      <div class="panel-body">
        <p>
          In process of figuring out what exactly to display here.
          But hey, click on the title and enjoy the magic!
        </p>
      </div>
    </div>  </div>
</template>
</template>

<script>
import { fetchProject } from './../../utils/fetchService'
export default {
  // NOTE I do not like this ProjectDisplay name.
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
    data () {
      return this.project.data
    }
  },

  mounted () {
    fetchProject(this)
  },

  watch: {
    '$route': 'fetchData'
  },

  methods: {
    fetchData () {
      fetchProject(this)
    }
  }
}
</script>

<style lang="scss">
</style>
