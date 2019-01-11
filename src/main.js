import Vue from 'vue'

import Meta from 'vue-meta'
import Router from 'vue-router'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Home from './components/Home'
import Blocks from './components/Blocks'
import Transactions from './components/Transactions'
import Block from './components/Block'
import Transaction from './components/Transaction'

Vue.use(Router)
Vue.use(Meta)

library.add(faBars)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

const routes = [
  { path: '/', component: Home },
  { path: '/blocks', component: Blocks },
  { path: '/transactions', component: Transactions },
  { path: '/block/:number', name: 'block', component: Block },
  { path: '/transaction/:hash', name: 'transaction', component: Transaction }
]

const router = new Router({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
