import Vue from 'vue'
import './plugins/vuetify'

import VueRouter from 'vue-router'
import App from './App.vue'

import Blocks from './components/Blocks'
import Transactions from './components/Transactions'
import Block from './components/Block'
import Transaction from './components/Transaction'

Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  { path: '/blocks', component: Blocks },
  { path: '/transactions', component: Transactions },
  { path: '/block/:number', name: 'block', component: Block },
  { path: '/transaction/:hash', name: 'transaction', component: Transaction }
]

const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
