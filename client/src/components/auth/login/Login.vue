<template lang="html">
  <div class="container">
    <div class="row">
      <div class="col-sm-4 col-sm-offset-4">
        <div class="panel panel-default">
          <div class="panel-body">
            <div class="headline center">
              <h1>Time Stamps</h1>
              <p>Login by using your Time Stamps account</p>
              <p class="small-message">
                Don't have an account yet? Create one using
                <router-link to="/register">register</router-link> page.
              </p>
            </div>
            <form>
              <message-display></message-display>
              <div class="form-group">
                <input v-model="email" type="email" class="form-control" placeholder="Email">
              </div>
              <div class="form-group">
                <input @keyup.enter="login" v-model="password" type="password" class="form-control" placeholder="Password">
              </div>
              <button @click="login" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AUTH_FAIL, SET_MESSAGE } from './../../../vuex/mutation-types.js'
import messageDisplay from './../../message-display/messageDisplay.vue'

import { emptyForm } from './../../../utils/messages.js'

export default {
  components: {
    'message-display': messageDisplay
  },

  data () {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    login () {
      if (!this.checkForm()) return

      this.$store.dispatch('login', {
        email: this.$data.email,
        password: this.$data.password
      })
    },

    checkForm () {
      if (!this.$data.email || !this.$data.password) {
        this.$store.commit(AUTH_FAIL)
        this.$store.commit(SET_MESSAGE, [emptyForm])
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
  .small-message {
    font-size: 75%;
  }
</style>
