<template>
  <div id="app" class="container">
    <div class="row">
      <router-link to="/">Home</router-link>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  created () {
    console.log(this)
    this.$store.dispatch('getPoems')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 25px;
}
</style>
