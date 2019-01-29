<template>
  <div>
    <div class="mobile-view-header">Transactions</div>
    <div class="mobile-view-container container">
      <router-link tag="div"  class="card link-card" v-for="tx in transactions" :key="tx.hash" :to="{ name: 'transaction', params: { hash: tx.hash } }">
        <div class="rainbow-left"></div>
        <div class="main-info">
          <span class="info-label">Transaction ID</span> <br />
          <span class="blue-link">{{ tx.hash }}</span>
        </div>
        <div><span class="info-label">Block:</span> {{ tx.block.toString() }}</div>
        <div><span class="info-label">Timestamp:</span> {{ tx.timestamp }}</div>
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
      transactions: [],
      page: 1,
      maxPage: 1
    }
  },
  watch: {
    '$route.query.page': function () {
      this.loadItems()
    }
  },
  mounted () {
    this.loadItems()
  },
  methods: {
    cleanTimestamp (timestamp) {
      timestamp = new BigNum(timestamp, 'hex').toString()
      const date = new Date()
      date.setTime(timestamp)
      return date.toUTCString()
    },
    loadItems () {
      this.page = parseInt(this.$route.query.page) || 1
      const start = (this.page - 1) * ITEMS_PER_PAGE
      const end = this.page * ITEMS_PER_PAGE

      let txs // TODO: Figure out how to get rid of this hack.
      plasma.operator.getRecentTransactions(start, end).then((transactions) => {
        // TODO: Filter out duplicates.
        transactions = transactions.filter((transaction) => {
          return !utils.utils.isString(transaction)
        })

        txs = transactions.map((transaction) => {
          return new UnsignedTransaction(transaction)
        })
        if (txs.length === 0) return

        return plasma.operator.getBlockMetadata(
          txs[txs.length - 1].block,
          txs[0].block
        )
      }).then((blocks) => {
        txs.forEach((transaction) => {
          transaction.timestamp = this.cleanTimestamp(blocks.find((block) => {
            return transaction.block.eq(new BigNum(block.blockNumber))
          }).timestamp)
        })
        this.transactions = txs
      })
    }
  }
}
</script>
