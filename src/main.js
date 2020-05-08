import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
const axios = require('axios');
Vue.prototype.$http = axios;

Vue.filter('upText', function (text) {
  return text.charAt(0).toUpperCase() + text.slice(1)
});

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
