import Vue from 'vue'

import Meta from 'vue-meta'
import Router from 'vue-router'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import Home from './components/Home'
import Blocks from './components/Blocks'
import Block from './components/Block'
import Transactions from './components/Transactions'
import Transaction from './components/Transaction'
import Account from './components/Account'
import PageNotFound from './components/PageNotFound'

Vue.use(Router)
Vue.use(Meta)

library.add(faBars)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

const routes = [
  { path: '/', component: Home },
  { path: '/blocks', component: Blocks },
  { path: '/block/:number', name: 'block', component: Block },
  { path: '/transactions', component: Transactions },
  { path: '/transaction/:hash', name: 'transaction', component: Transaction },
  { path: '/account/:address', name: 'account', component: Account },
  { path: "*", component: PageNotFound }
]

const router = new Router({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
