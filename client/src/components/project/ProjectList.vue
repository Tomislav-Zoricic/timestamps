<template lang="html">
  <div class="project-list">
    <router-link
      class="list-group-item"
      v-bind:class="{active: activeMark(p.id)}"
      v-for="p in projects"
      :to="{ name: 'selectedIssue', params: { id: p.id }}">
        {{ p.name }}
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    projects: {
      type: Array,
      required: true,
      default: []
    }
  },

  computed: {
    activeProject () {
      return this.$route.params.id
    }
  },

  methods: {
    // NOTE Set active css background to something more appropriate.
    activeMark (projectId) {
      return this.activeProject === projectId
    }
  }
}
</script>

<style lang="scss" scoped>
  .list-group-item {
    cursor: pointer;

    &.active {
      pointer-events: none;
    }
  }
</style>
