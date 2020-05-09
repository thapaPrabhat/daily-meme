import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './state/store'


Vue.config.productionTip = false
const axios = require('axios');
Vue.prototype.$http = axios;

Vue.filter('upText', function (text) {
  return text.charAt(0).toUpperCase() + text.slice(1)
});

Vue.filter('formatedDate', function (timestamp) {
  return new Date(timestamp).toGMTString()
});

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
