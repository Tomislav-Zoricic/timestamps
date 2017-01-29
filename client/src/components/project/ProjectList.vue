<template lang="html">
  <div class="project-list">
    <router-link
      class="list-group-item"
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
  }
}
</script>

<style lang="scss" scoped>
  .list-group-item {
    cursor: pointer;
  }
</style>
