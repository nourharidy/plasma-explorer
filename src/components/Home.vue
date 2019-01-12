<template>
  <div>
    <div class="hidden-xs-down"></div>
    <div class="hidden-sm-up">
      <div class="mobile-view-header">Dashboard</div>
      <div class="mobile-view-container container">
        <div class="mobile-sub-header">Blocks</div>
        <router-link tag="div" class="card" v-for="block in blocks" :key="block.number" :to="{ name: 'block', params: { number: block.number } }">
          <div class="rainbow-left"></div>
          <div class="main-info">
            <span class="info-label">Block</span> <span class="blue-link"> #{{ block.number }}</span>
          </div>
          <div><span class="info-label">Timestamp:</span> {{ block.timestamp }}</div>
          <div><span class="info-label">Transactions:</span> {{ block.transactions }}</div>
        </router-link>
        <div class="mobile-sub-header">Transactions</div>
        <router-link tag="div" class="card" v-for="tx in transactions" :key="tx.hash" :to="{ name: 'transacton', params: { hash: tx.hash } }">
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

  export default {
    data () {
      return {
        blocks: [],
        transactions: []
      }
    },
    mounted () {
      plasma.getBlocks(0, 10).then((blocks) => {
        this.blocks = blocks
      })
      plasma.getRecentTransactions(0, 10).then((transactions) => {
        this.transactions = transactions
      })
    }
  }
</script>

<style>
.table-row {
  cursor: pointer;
}
</style>
