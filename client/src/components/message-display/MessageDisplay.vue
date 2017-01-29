<template lang="html">
  <div v-if="messages" class="message">
    <ul class="list-group">
      <li v-for="message in messages"
          class="list-group-item"
          v-bind:class="{ 'list-group-item-success': message.isSuccess,
                          'list-group-item-info': message.isInfo,
                          'list-group-item-danger': message.isError }">
          {{ message.message }}
      </li>
    </ul>
  </div>
</template>

<script>
import { types } from './../../utils/messages.js'
export default {
  computed: {
    messages () {
      return this.$store.getters.messages.map(msg => {
        return {
          message: msg.message,
          isError: msg.type === types.error,
          isSuccess: msg.type === types.success,
          isInfo: msg.type === types.info
        }
      })
    }
  }
}
</script>

<style lang="css">
</style>
