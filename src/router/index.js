import Vue from 'vue'
import VueRouter from 'vue-router'
import Jokes from '../components/Jokes'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Jokes',
    component: Jokes,
  },
  {
    path: '/submit-yours',
    name: 'SubmitJokes',
    component: () => import('../components/SubmitJoke.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
