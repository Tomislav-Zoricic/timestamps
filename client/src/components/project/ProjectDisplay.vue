<template lang="html">
  <div class="project-display">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">{{activeProject.name}}</h3>
      </div>
      <div class="panel-body">
        <p>Budget: {{activeProject.budget | dollar}}</p>
        <p v-if="activeProject.customerId">Has customer</p>
        <p v-else>Internal project</p>
      </div>
    </div>  </div>
</template>

<script>
export default {
  name: 'ProjectDisplay',
  props: {
    activeProject: {
      type: Object,
      default () {
        return {}
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
      let projectId = this.$route.params.id
      this.$store.dispatch('getProject', projectId)
    }
  }
}
</script>

<style lang="scss">
</style>
