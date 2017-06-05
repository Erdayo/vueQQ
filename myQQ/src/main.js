// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueTouch from 'vue-touch'
import './assets/css/common.css'
import './assets/css/animate.css'
import io from '../static/socket.io/socket.io-1.0.6'

Vue.config.productionTip = false
// axios.defaults.withCredentials = true
Vue.prototype.$ajax = axios
Vue.prototype.ioUrl = 'http://127.0.0.1:3000'
Vue.prototype.httpServer = io.connect(Vue.prototype.ioUrl)
Vue.use(VueTouch, {name: 'v-touch'})

router.replace('login')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
