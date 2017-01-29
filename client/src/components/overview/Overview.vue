<template lang="html">
  <div class="overview">
    <navbar></navbar>
    <div class="container">
      <div class="row">
       <div class="col-sm-12">
         <div class="page-header">
           <h1>Time Stamps <small>Here for all your time tracking needs.</small></h1>
         </div>
        </div>
      </div>
      <div class="row">
      <div class="col-sm-4 board">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">First panel</h3>
          </div>
          <div class="panel-body">{{dummyText}}</div>
        </div>
      </div>
      <div class="col-sm-4 board">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Second panel</h3>
          </div>
          <div class="panel-body">{{dummyText}}</div>
        </div>
      </div>
      <div class="col-sm-4 board">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Third panel</h3>
          </div>
          <div class="panel-body">{{dummyText}}</div>
        </div>
      </div>
     </div>
    </div>
  </div>
</template>

<script>
import Navbar from './../navbar/Navbar.vue'

export default {
  data () {
    return {
      dummyText: `Lorem ipsum dolor sit amet,
                  consectetur adipisicing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                  Excepteur sint occaecat cupidatat non proident,
                  sunt in culpa qui officia deserunt mollit anim id est laborum.`
    }
  },
  components: { Navbar }
}
</script>

<style lang="scss">
  .overview {
    width: 100%;

    .board {
      min-height: 250px;
    }
  }
</style>
