<template>
  <div class="home" v-if="poem.title">
    <h2>Edit {{poem.title.value}}</h2>
    <br><br>
    <div class="form-group col-sm-8 col-sm-offset-2" v-for="(item, key) in poem">
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

    <div class="col-sm-12">
      <button class="btn btn-danger" @click="delete">Delete</button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'edit',
  data () {
    return {
      features: {
      }
    }
  },
  created () {
    this.features = JSON.parse(JSON.stringify(this.$store.state.schema))
    for (var key in this.features) {
      console.log(key)
      this.features[key].value = null
    }
  },
  computed: {
    poem () {
      var allPoems = this.$store.state.poems
      console.log('All poems: ', allPoems.length)
      var currentIndex = this.$route.params.poem_index
      console.log('Current index: ', currentIndex)
      if (allPoems && allPoems.length > currentIndex) {
        var poem = JSON.parse(JSON.stringify(this.$store.state.schema))
        var poemValues = allPoems[currentIndex]
        console.log('Poem Values', poemValues)
        for (var key in poem) {
          if (poemValues[key]) {
            poem[key].value = poemValues[key]
          } else {
            if (poem[key].type === 'multiple-select') {
              poem[key].value = []
            } else {
              poem[key].value = null
            }
          }
        }
        console.log('POEM: ', poem)
        return poem
      } else {
        return {}
      }
    }
  },
  methods: {
    save () {
      var allPoems = this.$store.state.poems
      var currentIndex = this.$route.params.poem_index
      var currentPoem = allPoems[currentIndex]
      var values = {}
      for (var key in currentPoem) {
        if (this.poem[key]) {
          values[key] = this.poem[key].value
        } else {
          values[key] = currentPoem[key]
        }
      }
      for (var key2 in this.poem) {
        if (values[key2] === undefined) {
          values[key2] = this.poem[key2].value
        }
      }
      this.$http.post('/api/savepoem', values).then(response => {
        if (response === true) {
          alert('Poem saved.')
          this.$store.dispatch('getPoems')
          this.$route.push('/')
        } else {
          alert(response)
        }
      })
    },
    delete () {
      var allPoems = this.$store.state.poems
      var currentIndex = this.$route.params.poem_index
      var currentPoem = allPoems[currentIndex]
      this.$http.post('/api/deletepoem', currentPoem).then(response => {
        if (response === true) {
          alert('Poem deleted.')
          this.$store.dispatch('getPoems')
          this.$route.push('/')
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

