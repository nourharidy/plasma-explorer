<template>
  <div>
    <div class="mobile-view-header">Dashboard</div>
    <div class="mobile-view-container container">
      <div class="mobile-sub-header">Blocks</div>
      <router-link tag="div" class="card link-card" v-for="block in blocks" :key="block.blockNumber" :to="{ name: 'block', params: { number: block.blockNumber } }">
        <div class="rainbow-left"></div>
        <div class="main-info">
          <span class="info-label">Block</span> <span class="blue-link"> #{{ block.blockNumber }}</span>
        </div>
        <div><span class="info-label">Timestamp:</span> {{ block.timestamp }}</div>
        <div><span class="info-label">Transactions:</span> {{ block.numTxs }}</div>
      </router-link>
      <div class="mobile-sub-header">Transactions</div>
      <router-link tag="div" class="card link-card" v-for="tx in transactions" :key="tx.hash" :to="{ name: 'transacton', params: { hash: tx.hash } }">
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

export default {
  data () {
    return {
      blocks: [],
      transactions: []
    }
  },
  mounted () {
    plasma.operator.getCurrentBlock().then((end) => {
      let start = end - 10
      start = start >= 1 ? start : 1
      return plasma.operator.getBlockMetadata(start, end)
    }).then((blocks) => {
      blocks.forEach((block) => {
        block.timestamp = this.cleanTimestamp(block.timestamp)
      })
      this.blocks = blocks.reverse()
    })
    plasma.operator.getRecentTransactions(0, 10).then((transactions) => {
      // TODO: Filter out duplicates.
      transactions = transactions.filter((transaction) => {
        return !utils.utils.isString(transaction)
      })

      this.transactions = transactions.map((transaction) => {
        return new UnsignedTransaction(transaction)
      })
      if (this.transactions.length === 0) return

      return plasma.operator.getBlockMetadata(
        this.transactions[this.transactions.length - 1].block,
        this.transactions[0].block
      )
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
