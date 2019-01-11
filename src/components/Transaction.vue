<template>
  <div>
    <div class="hidden-xs-down"></div>
    <div class="hidden-sm-up">
      <div class="mobile-view-header ellipsis">Transaction <span class="no-text-transform">{{ transaction.hash }}</span></div>
      <div class="mobile-view-container container">
        <div class="card">
          <div class="rainbow-left"></div>
          <div class="main-info">
            <span class="info-label">Block</span> #{{ transaction.block }}
          </div>
          <div><span class="info-label">Timestamp:</span> {{ transaction.timestamp }}</div>
        </div>
        <div class="mobile-sub-header">Transfers</div>
        <div class="card text-center" v-if="transaction.transfers.length === 0">
          This transaction doesn't have any transfers!
        </div>
        <div class="card" v-for="transfer in transaction.transfers" :key="transfer.id">
          <div class="main-info">
            {{ transfer.amount }} {{ transfer.token }}
          </div>
          <div><span class="info-label">From:</span> {{ transfer.sender }}</div>
          <div><span class="info-label">To:</span> {{ transfer.recipient }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import plasma from '../services/client-service'

export default {
  data () {
    return {
      transfer: {},
      transaction: {
        transfers: []
      },
      hash: undefined
    }
  },
  mounted () {
    this.hash = this.$route.params.hash
    this.loadItems()
  },
  methods: {
    loadItems () {
      this.page = parseInt(this.$route.query.page) || 1
      plasma.getTransaction(this.hash).then((transaction) => {
        this.transaction = transaction
      })
    }
  }
}
</script>

<style>
.content {
  padding: 20px;
}

.item-hash {
  margin-bottom: 20px;
}
.item-hash > span {
  color: #999;
}

.property-title {
  font-weight: bold;
}
</style>
