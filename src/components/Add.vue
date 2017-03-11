<template>
  <div class="home">
    <h2>Insert a New Poem</h2>
    <br><br>
    <div class="form-group col-sm-8 col-sm-offset-2" v-for="(item, key) in features">
      <label :for="key">{{key | capitalize}}</label>
      <h5>{{item.description}}
        <span v-if="item.type == 'multiple-select'">
          <br><br>
          You can select multiple with <code>shift</code>,<code>command</code>, or <code>ctrl</code>.
          </span>
      </h5>
      
      <input type="text" class="form-control" v-if="item.type == 'text'" :id="key" v-model="item.value">
      
      <input type="number" class="form-control" v-else-if="item.type == 'number'" :id="key" v-model="item.value">
      
      <textarea class="form-control" rows="10" v-else-if="item.type == 'longtext'" :id="key" v-model="item.value"></textarea>

      <select class="form-control" v-else-if="item.type == 'select'" :id="key" v-model="item.value">
        <option v-for="option in item.options" :value="option">{{option}}</option>
      </select>

      <select class="form-control" v-else-if="item.type == 'multiple-select'" :id="key" v-model="item.value" multiple>
        <option v-for="option in item.options" :value="option">{{option}}</option>
      </select>

    </div>
    <div class="col-sm-12">
      <button class="btn btn-primary" @click="save">Save</button>
    </div>
  </div>
</template>

<script>
import router from '../router'

export default {
  name: 'add',
  data () {
    return {
    }
  },
  created () {

  },
  computed: {
    features () {
      var features = this.schema
      console.log('FEATURES', features)
      for (var key in features) {
        if (features[key].type === 'multiple-select') {
          features[key].value = []
        } else {
          features[key].value = null
        }
      }
      return features
    },
    schema () {
      return this.$store.state.schema
    },
    poem () {
      var poem = {}
      for (var key in this.features) {
        poem[key] = this.features[key].value
      }
      return poem
    }
  },
  methods: {
    save () {
      this.$http.post('/api/addpoem', this.poem).then(response => {
        if (response.data === true) {
          alert('Poem added.')
          this.$store.dispatch('getPoems')
          router.push('/')
        } else {
          alert(response)
        }
      })
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
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
