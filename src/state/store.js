import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    apiInfo: {},
    joke: null,
    error: {},
  },
  actions: {
    initialApiFetch({commit}) {
      axios
        .get("https://sv443.net/jokeapi/v2/info")
        .then(res => {
          if (res.errro) throw "Woops Something went wrong. Try again !"
          commit('initialApiInfo', res.data)
        })
        .catch(err => {
          console.log(err)
        });
    },
    getJoke({commit}, data) {
      axios
        .get("https://sv443.net/jokeapi/v2/joke/" + data.path + data.query)
        .then(res => {
          if (res.data.error) throw res.data;
          commit('setJoke', res.data)
        })
        .catch(err => {
          commit('setJoke', null)
          commit('getJokeError', err)
        })
        ;
    },
  },
  mutations: {
    initialApiInfo(state, data) {
      state.apiInfo = data
    },
    setJoke(state, joke) {
      state.joke = joke
    },
    getJokeError(state, error){
      state.error = error
    }
  }
})
export default store