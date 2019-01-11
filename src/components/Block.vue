<template>
  <div>
    <div class="hidden-xs-down"></div>
    <div class="hidden-sm-up">
      <div class="mobile-view-header">Block #{{ block.number }}</div>
      <div class="mobile-view-container container">
        <div class="card">
          <div class="rainbow-left"></div>
          <div class="main-info">
            <span class="info-label">Block Hash</span> <br />
            {{ block.hash }}
          </div>
          <div class="main-info">
            <span class="info-label">Operator Address</span> <br />
            {{ block.operator }}
          </div>
          <div><span class="info-label">Timestamp:</span> {{ block.timestamp }}</div>
          <div><span class="info-label">Transactions:</span> {{ block.transactions }}</div>
        </div>
        <div class="mobile-sub-header">Transactions</div>
        <div class="card text-center" v-if="transactions.length === 0">
          This block doesn't have any transactions!
        </div>
        <router-link tag="div" class="card" v-for="tx in transactions" :key="tx.hash" :to="{ name: 'transaction', params: { hash: tx.hash } }">
          <div class="main-info">
            {{ tx.hash }}
          </div>
          <div><span class="info-label">Transfers:</span> {{ tx.transfers.length }}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import plasma from '../services/client-service'

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

    plasma.getBlock(number).then((block) => {
      this.block = block
    })

    this.loadTransactions()
  },
  methods: {
    loadTransactions () {
      const number = parseInt(this.$route.params.number)
      this.page = parseInt(this.$route.query.page) || 1
      const start = (this.page - 1) * ITEMS_PER_PAGE
      const end = this.page * ITEMS_PER_PAGE

      plasma.getTransactionsInBlock(number, start, end).then((transactions) => {
        this.transactions = transactions
      })
    }
  }
}
</script>

<style lang="scss">
.block-info {
  height: 200px;
}
</style>
