<template>
  <div>
    <div class="mobile-view-header">Block #{{ block.blockNumber }}</div>
    <div class="mobile-view-container container">
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
  </div>
</template>

<script>
import plasma from '../services/client-service'
import BigNum from 'bn.js'
import utils from 'plasma-utils'
const models = utils.serialization.models
const UnsignedTransaction = models.UnsignedTransaction

const ITEMS_PER_PAGE = 10

export default {
  data () {
    return {
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
    const number = parseInt(this.$route.params.number)

    plasma.operator.getBlockMetadata(number).then((block) => {
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
      // const number = parseInt(this.$route.params.number)
      const blockNumber = this.$route.params.number
      const token = 'none'
      this.page = parseInt(this.$route.query.page) || 1
      const start = '0'
      const end = 'ffffffffffffffffffffffffffffffff'

      plasma.operator.getBlockTransactions(blockNumber, token, start).then((transactions) => {
        transactions.forEach((transaction) => {
          transaction.hash = new UnsignedTransaction(transaction.encoding).hash
        })
        this.transactions = transactions
      })
    }
  }
}
</script>
