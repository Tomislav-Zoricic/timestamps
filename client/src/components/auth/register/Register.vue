<template lang="html">
  <div class="container">
    <div class="row">
      <div class="col-sm-4 col-sm-offset-4">
        <div class="panel panel-default">
          <div class="panel-body">
            <div class="headline center">
              <h1>Time Stamps</h1>
              <p>Create your account to start using Time Stamps</p>
              <p class="small-message">
                Already have an account?
                Use <router-link to="/login">login</router-link>
                page to enter the app.
              </p>
            </div>
            <form>
              <message-display></message-display>
              <div class="form-group">
                <input v-model="email" type="email" class="form-control" placeholder="Email">
              </div>
              <div class="form-group">
                <input v-model="password" type="password" class="form-control" placeholder="Password">
              </div>
              <div class="form-group">
                <input v-model="passwordRepeat"
                       @keyup.enter="register"
                       class="form-control"
                       type="password"
                       placeholder="Repeat Password">
              </div>
              <button @click="register" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import passwordChecker from './../../../utils/password-strength-checker.js'
  import validator from 'email-validator'
  import messageDisplay from './../../message-display/messageDisplay.vue'
  import { AUTH_FAIL, SET_MESSAGE } from './../../../vuex/mutation-types.js'
  import {
           types,
           invalidEmail,
           emptyForm,
           passwordsMismatch
  } from './../../../utils/messages.js'

  // Adapt message format to error print format of messages.
  function transformMessages (messages) {
    return messages.map(msg => {
      return {
        message: msg,
        type: types.error
      }
    })
  }

  export default {
    components: {
      'message-display': messageDisplay
    },

    data () {
      return {
        email: '',
        password: '',
        passwordRepeat: ''
      }
    },

    methods: {
      register () {
        if (!this.checkForm()) return

        this.$store.dispatch('register', {
          email: this.email,
          password: this.password
        })
      },

      checkForm () {
        if (!validator.validate(this.email)) {
          this.$store.commit(AUTH_FAIL)
          this.$store.commit(SET_MESSAGE, [invalidEmail])
          return false
        }

        let password = this.password
        let passwordRepeat = this.passwordRepeat
        if (!this.email || !password || !passwordRepeat) {
          this.$store.commit(AUTH_FAIL)
          this.$store.commit(SET_MESSAGE, [emptyForm])
          return false
        }

        /*
        let { errors: passwordErrors } = passwordChecker.test(password)
        if (passwordErrors.length) {
          this.$store.commit(AUTH_FAIL)
          this.$store.commit(SET_MESSAGE, transformMessages(passwordErrors))
          return false
        }
        */
        if (password !== passwordRepeat) {
          this.$store.commit(AUTH_FAIL)
          this.$store.commit(SET_MESSAGE, [passwordsMismatch])
          return false
        }
        return true
      }
    }
  }
</script>


<style lang="scss" scoped>
  .error {
    border-color: red;
  }

  .small-message {
    font-size: 75%;
  }
</style>
