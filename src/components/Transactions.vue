<template>
  <div>
    <div class="hidden-xs-down">
    </div>
    <div class="hidden-sm-up">
      <div class="mobile-view-header">Transactions</div>
      <div class="mobile-view-container container">
        <router-link tag="div" v-for="tx in transactions" :key="tx.hash" :to="{ name: 'transaction', params: { hash: tx.hash } }" class="card">
          <div class="rainbow-left"></div>
          <div class="main-info">
            <span class="info-label">Transaction ID</span> <br />
            <span class="blue-link">{{ tx.hash }}</span>
          </div>
          <div><span class="info-label">Block:</span> {{ tx.block }}</div>
          <div><span class="info-label">Timestamp:</span> {{ tx.timestamp }}</div>
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
    loadItems () {
      this.page = parseInt(this.$route.query.page) || 1
      const start = (this.page - 1) * ITEMS_PER_PAGE
      const end = this.page * ITEMS_PER_PAGE

      plasma.getRecentTransactions(start, end).then((transactions) => {
        this.transactions = transactions
      })
    }
  }
}
</script>

<style lang="scss">

</style>
