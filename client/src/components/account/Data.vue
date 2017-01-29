<template lang="html">
  <form>
    <div class="form-group">
      <input :value="user.email"
              disabled
              type="email"
              class="form-control"
              placeholder="Email">
    </div>
    <div class="form-group">
      <input :value="user.firstName"
             :label="firstNameLabel"
             @input="updateText"
             @keyup.enter="saveChanges"
             type="text"
             class="form-control"
             placeholder="First Name">
    </div>
    <div class="form-group">
      <input :value="user.lastName"
             :label="lastNameLabel"
             @input="updateText"
             @keyup.enter="saveChanges"
             type="text"
             class="form-control"
             placeholder="Last Name">
    </div>
    <message-display></message-display>
  </form>
</template>

<script>
import $ from 'jquery'
import { saveByClickingEnter } from './../../utils/messages.js'
import { SET_MESSAGE } from './../../vuex/mutation-types.js'
import messageDisplay from './../message-display/messageDisplay.vue'

export default {
  components: {
    'message-display': messageDisplay
  },

  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      firstName: '',
      lastName: '',
      firstNameLabel: 'firstName',
      lastNameLabel: 'lastName'
    }
  },

  mounted () {
    $('input').focus(() => {
      this.$store.commit(SET_MESSAGE, [saveByClickingEnter])
    })
    .blur(() => {
      this.$store.commit(SET_MESSAGE)
    })
  },

  methods: {
    // NOTE make check for empy / invalid values
    updateText (e) {
      let label = e.target.getAttribute('label')
      let value = e.target.value
      this[label] = value
    },

    saveChanges (e) {
      let label = e.target.getAttribute('label')
      this.$store.dispatch('updateUser', {
        id: this.user.id,
        param: label,
        value: this[label]
      })
    }
  }
}
</script>

<style lang="css">
</style>
