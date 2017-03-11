import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production', // strict mode is only for development
  state: {
    poems: [],
    selectedPoem: null,
    schema: {}
  },
  mutations: {
    poems (state, value) { state.poems = value },
    selectedPoem (state, value) { state.selectedPoem = value },
    schema (state, value) {
      if (Object.keys(state.schema).length === 0) {
        state.schema = value
      }
    }
  },
  actions: {
    getPoems (context) {
      Vue.http.get('/api/getpoems').then(response => {
        console.log(response.data)
        context.commit('poems', response.data)
        context.commit('selectedPoem', null)
      }, response => {
        context.commit('poems', [])
        context.commit('selectedPoem', null)
      })

      Vue.http.get('/api/getschema').then(response => {
        console.log(response.data)
        context.commit('schema', response.data)
      }, response => {
        context.commit('schema', {})
      })
    },
    selectPoem (context, value) {
      context.commit('selectedPoem', value)
      router.push('/edit/' + value)
    }
  }
})
