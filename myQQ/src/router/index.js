import Vue from 'vue'
import Router from 'vue-router'
import Msg from '@/components/Msg'
import NotFound from '@/components/NotFound'
import Contact from '@/components/Contact'
import Dialog from '@/components/Dialog'
import Other from '@/components/Other'
import Vuetouch from 'vue-touch'

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
    }
  ]
})
