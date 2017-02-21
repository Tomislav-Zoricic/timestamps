<template lang="html">
  <div v-if="messages" class="message">
    <ul class="list-group">
      <li v-for="message in messages"
          class="list-group-item"
          v-bind:class="message.type">
          {{ message.message }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    messages () {
      return this.$store.getters.messages.map(msg => {
        return {
          message: msg.message,
          type: this.messageType(msg.type)
        }
      })
    }
  },
  methods: {
    messageType (type) {
      return `list-group-item-${type}`
    }
  }
}
</script>

<style lang="css">
</style>
