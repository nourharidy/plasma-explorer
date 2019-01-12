<template>
  <div>
    <div class="mobile-view-header ellipsis">Account <span class="no-text-transform">{{ account.address }}</span></div>
    <div class="mobile-view-container container">
      <div class="mobile-sub-header">Balances</div>
      <div class="card text-center" v-if="account.balances.length === 0">
        This account doesn't have any tokens!
      </div>
      <div class="card" v-for="balance in account.balances" :key="balance.token">
        <div class="main-info">
          {{ balance.amount }} {{ balance.token }}
        </div>
      </div>
      <div class="mobile-sub-header">Transactions</div>
      <div class="card text-center" v-if="transactions.length === 0">
        This account hasn't made any transactions!
      </div>
      <router-link tag="div" class="card" v-for="tx in transactions" :key="tx.hash" :to="{ name: 'transaction', params: { hash: tx.hash } }">
        <div class="main-info">
          {{ tx.hash }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import plasma from '../services/client-service'

export default {
  data () {
    return {
      account: {
        balances: []
      },
      transactions: [],
      address: undefined
    }
  },
  mounted () {
    this.address = this.$route.params.address
    this.loadItems()
  },
  methods: {
    loadItems () {
      plasma.getAccount(this.address).then((account) => {
        this.account = account
      })
      plasma.getTransactionsByAddress(this.address, 0, 10).then((transactions) => {
        this.transactions = transactions
      })
    }
  }
}
</script>
