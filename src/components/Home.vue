<template>
  <div class="home">
    <h2>View/Edit an existing poem</h2>
    <div class="col-sm-6 col-sm-offset-3">
      <select class="form-control" v-model="selectedPoem">
        <option v-for="(poem, index) in existingPoems" :value="index">{{poem.title}}</option>
      </select>
    </div>
    <div class="col-sm-12">
      <h2>OR</h2>
      <router-link class="btn btn-primary btn-lg" to="/add">Add New Poem</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
    }
  },
  computed: {
    existingPoems () {
      console.log(this.$store.state.poems)
      return this.$store.state.poems
    },
    selectedPoem: {
        // getter
      get () {
        return this.$store.state.selectedPoem
      },
      // setter
      set (newValue) {
        console.log(newValue)
        this.$store.dispatch('selectPoem', newValue)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
