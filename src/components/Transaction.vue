<template>
  <div>
    <div class="view-header">Transaction</div>
    <div class="view-header-small">
      <span class="header-title">Hash</span> | {{ transaction.hash }}
    </div>
    <div v-for="transfer in transaction.transfers" :key="transfer.id">
      <div class="single-info pure-g">
        <div class="rainbow-left"></div>
        <div class="pure-u-1 pure-u-sm-1-3 text-center">
          <div class="info-point">
            <div class="info-data ellipsis">{{ transfer.sender }}</div>
          </div>
        </div>
        <div class="pure-u-1 pure-u-sm-1-3 text-center">
          <div>{{ transfer.amount }} {{ transfer.token }}</div>
        </div>
        <div class="pure-u-1 pure-u-sm-1-3 text-center">
          <div class="info-point">
            <div class="info-data ellipsis">{{ transfer.recipient }}</div>
          </div>
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
      transaction: {},
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
