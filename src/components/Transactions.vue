<template>
  <div>
    <div class="mobile-view-header">Transactions</div>
    <div class="navbar-buffer"></div>
    <div class="text-center" v-if="loading">
      <div class="lds-heart"><div></div></div>
    </div>
    <div class="container" v-if="!loading && !error">
      <div class="mobile-sub-header">Transactions</div>
      <router-link tag="div" class="card link-card" v-for="tx in transactions" :key="tx.hash" :to="{ name: 'transaction', params: { hash: tx.hash } }">
        <div class="main-info">
          {{ tx.hash }}
        </div>
        <div><span class="info-label">Transfers:</span> {{ tx.transfers.length }}</div>
      </router-link>
      <div class="card text-center" v-if="transactions.length === 0">
        There aren't any transactions yet!
      </div>
    </div>
    <div class="container" v-if="error">
      <div class="card text-center">
        Whoops, something broke. This probably means there's an error on our end.
      </div>
    </div>
  </div>
</template>

<script>
import plasma from '../services/client-service'
import BigNum from 'bn.js'
import utils from 'plasma-utils'
const models = utils.serialization.models
const UnsignedTransaction = models.UnsignedTransaction

export default {
  data () {
    return {
      transactions: [],
      loading: true,
      error: false
    }
  },
  mounted () {
    plasma.operator.getRecentTransactions(0, 20).then((transactions) => {
      // TODO: Filter out duplicates.
      transactions = transactions.filter((transaction) => {
        return !utils.utils.isString(transaction)
      })

      this.transactions = transactions.map((transaction) => {
        return new UnsignedTransaction(transaction)
      })
      this.loading = false
    })
  },
  methods: {
    cleanTimestamp (timestamp) {
      timestamp = new BigNum(timestamp, 'hex').toString()
      const date = new Date()
      date.setTime(timestamp)
      return date.toUTCString()
    }
  }
}
</script>
