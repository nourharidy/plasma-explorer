<template>
  <div>
    <div class="mobile-view-header">Dashboard</div>
    <div class="navbar-buffer"></div>
    <div class="text-center" v-if="loading">
      <div class="lds-heart"><div></div></div>
    </div>
    <div class="container pure-g" v-if="!loading && !error">
      <div class="pure-u-1 pure-u-lg-1-2">
        <div class="mobile-sub-header">Blocks</div>
        <router-link tag="div" class="card link-card" v-for="block in blocks" :key="block.blockNumber" :to="{ name: 'block', params: { number: block.blockNumber } }">
          <div class="rainbow-left"></div>
          <div class="main-info">
            <span class="info-label">Block</span> <span class="blue-link"> #{{ block.blockNumber }}</span>
          </div>
          <div><span class="info-label">Timestamp:</span> {{ block.timestamp }}</div>
          <div><span class="info-label">Transactions:</span> {{ block.numTxs }}</div>
        </router-link>
      </div>
      <div class="pure-u-1 pure-u-lg-1-2">
        <div class="mobile-sub-header">Transactions</div>
        <router-link tag="div" class="card link-card" v-for="tx in transactions" :key="tx.hash" :to="{ name: 'transaction', params: { hash: tx.hash } }">
          <div class="main-info">
            {{ tx.hash }}
          </div>
          <div><span class="info-label">Transfers:</span> {{ tx.transfers.length }}</div>
        </router-link>
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
      blocks: [],
      transactions: [],
      loading: true,
      error: false
    }
  },
  mounted () {
    plasma.operator.getCurrentBlock().then((end) => {
      let start = end - 10
      start = start >= 1 ? start : 1
      return plasma.operator.getBlockMetadata(start, end)
    }).then((blocks) => {
      blocks.forEach((block) => {
        block.blockNumber = new BigNum(block.blockNumber, 16).toString(10)
        block.timestamp = this.cleanTimestamp(block.timestamp)
      })
      this.blocks = blocks.reverse()
      return plasma.operator.getRecentTransactions(0, 10)
    }).then((transactions) => {
      // TODO: Filter out duplicates.
      transactions = transactions.filter((transaction) => {
        return !utils.utils.isString(transaction)
      })

      this.transactions = transactions.map((transaction) => {
        return new UnsignedTransaction(transaction)
      })
      this.loading = false
    }).catch((err) => {
      this.loading = false
      this.error = true
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
