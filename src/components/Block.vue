<template>
  <div>
    <div class="mobile-view-header">Block #{{ blockNumber }}</div>
    <div class="navbar-buffer"></div>
    <div class="text-center" v-if="loading">
      <div class="lds-heart"><div></div></div>
    </div>
    <div class="container" v-if="!loading && !error">
      <div class="card">
        <div class="rainbow-left"></div>
        <div class="main-info">
          <span class="info-label">Block Hash</span> <br />
          {{ block.rootHash }}
        </div>
        <div><span class="info-label">Timestamp:</span> {{ block.timestamp }}</div>
        <div><span class="info-label">Transactions:</span> {{ block.numTxs }}</div>
      </div>
      <div class="mobile-sub-header">Transactions</div>
      <div class="card text-center" v-if="transactions.length === 0">
        This block doesn't have any transactions!
      </div>
      <router-link tag="div" class="card link-card" v-for="tx in transactions" :key="tx.hash" :to="{ name: 'transaction', params: { hash: tx.hash } }">
        <div class="main-info">
          {{ tx.hash }}
        </div>
        <div><span class="info-label">Transfers:</span> {{ tx.transfers.length }}</div>
      </router-link>
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
      error: false,
      loading: true,
      blockNumber: '',
      block: {},
      transactions: []
    }
  },
  watch: {
    '$route.query.page': function () {
      this.loadTransactions()
    }
  },
  mounted () {
    this.blockNumber = parseInt(this.$route.params.number)

    plasma.operator.getBlockMetadata(this.blockNumber).then((block) => {
      block = block[0]
      block.timestamp = this.cleanTimestamp(block.timestamp)
      this.block = block
    })

    this.loadTransactions()
  },
  methods: {
    cleanTimestamp (timestamp) {
      timestamp = new BigNum(timestamp, 'hex').toString()
      const date = new Date()
      date.setTime(timestamp)
      return date.toUTCString()
    },
    loadTransactions () {
      const blockNumber = this.$route.params.number
      this.page = parseInt(this.$route.query.page) || 1
      const token = 'none'
      const start = '0'

      plasma.operator.getBlockTransactions(blockNumber, token, start).then((transactions) => {
        transactions.forEach((transaction) => {
          transaction.hash = new UnsignedTransaction(transaction.encoding).hash
        })
        this.transactions = transactions
        this.loading = false
      }).catch(() => {
        this.loading = false
        this.error = true
      })
    }
  }
}
</script>
