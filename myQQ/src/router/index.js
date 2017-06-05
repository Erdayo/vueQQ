import Vue from 'vue'
import Router from 'vue-router'
import Msg from '@/components/Msg'
import NotFound from '@/components/NotFound'
import Contact from '@/components/Contact'
import Dialog from '@/components/Dialog'
import Other from '@/components/Other'
import Setting from '@/components/Setting'
import Information from '@/components/Information'
import Vuetouch from 'vue-touch'
import Article from '@/components/Article'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Router)
Vue.use(Vuetouch, {name: 'v-touch'})

export default new Router({
  routes: [
    {
      path: '/msg',
      name: 'Msg',
      component: Msg
    },
    {
      path: '/404',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/dialog/:id',
      name: 'Dialog',
      component: Dialog
    },
    {
      path: '/other',
      name: 'Other',
      component: Other
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting
    },
    {
      path: '/information',
      name: 'Information',
      component: Information
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: Article
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
