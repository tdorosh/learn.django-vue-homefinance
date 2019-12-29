import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios';
import Paginate from 'vuejs-paginate'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.component('paginate', Paginate)

const token = localStorage.getItem('user-token')
if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
