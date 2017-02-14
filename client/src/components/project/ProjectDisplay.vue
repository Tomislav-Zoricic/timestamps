<template lang="html">
  <div class="project-display">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">
          <router-link
            :to="{ name: 'project', params: { id: project.data.id }}">
              {{ project.data.name }}
          </router-link>
        </h3>
      </div>
      <div class="panel-body">
        <p>Budget: {{project.data.budget | dollar}}</p>
        <p v-if="project.data.customerId">Has customer</p>
        <p v-else>Internal project</p>
      </div>
    </div>  </div>
</template>

<script>
export default {
  name: 'ProjectDisplay',
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

  mounted () {
    this.fetchData()
  },

  watch: {
    '$route': 'fetchData'
  },

  filters: {
    dollar: function (value) {
      return value ? `${value.toString()} $` : ''
    }
  },

  methods: {
    fetchData () {
      let id = this.$route.params.id
      this.$store.dispatch('getProject', { id })
    }
  }
}
</script>

<style lang="scss">
</style>
