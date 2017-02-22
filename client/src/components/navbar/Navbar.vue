<template lang="html">
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <div class="navbar-header">
        <router-link class="navbar-brand" to="/">
          <span class="glyphicon glyphicon-home" aria-hidden="true"></span>
        </router-link>
      </div><!-- /.navbar-header -->
      <ul class="nav navbar-nav">
        <li><a>Timesheets</a></li>
        <li><a>Reports</a></li>
        <li><router-link to="/projects">Projects</router-link></li>
        <!--<li><router-link to="/time">Timesheets</router-link></li>-->
        <!--<li><router-link to="/reports">Reports</router-link></li>-->

      </ul><!-- /.navbar-nav -->

      <ul class="nav navbar-nav navbar-right">
         <li><a>Help</a></li>
         <li class="dropdown">
           <a href="#" class="dropdown-toggle"
                       data-toggle="dropdown"
                       role="button"
                       aria-haspopup="true"
                       aria-expanded="false">{{user.firstName}} {{user.lastName}} <span class="caret"></span>
          </a>
           <ul class="dropdown-menu">
             <li><router-link to="/people">My Profile</router-link></li>
             <li role="separator" class="divider"></li>
             <li><a><div @click="logout" class="logout">Sign Out</div></a></li>
           </ul>
         </li>
       </ul>

    </div><!-- /.container-fluid -->
  </nav>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters.user
    }
  },

  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style lang="scss" scoped>
  .logout {
    cursor: pointer;
  }
</style>
