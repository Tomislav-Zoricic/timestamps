<template lang="html">
  <div class="jumbotron">
    <h1>Your account, Senor/ita {{user.lastName}}</h1></h1>
    <p>Use this page to check / update your personal data.</p>
    <p>
      Use this <router-link to="/">link</router-link>
      to return back to your home page.
    </p>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="css">
</style>
