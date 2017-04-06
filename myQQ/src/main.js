// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueTouch from 'vue-touch'
import './assets/css/common.css'
import './assets/css/animate.css'

Vue.config.productionTip = false
Vue.prototype.$ajax = axios
Vue.use(VueTouch, {name: 'v-touch'})

router.replace('msg')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
