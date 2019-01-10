<template>
  <div>
    <div class="view-header">Block #{{ block.number }}</div>
    <div class="single-info">
      <div class="rainbow-left"></div>
      <div class="info-block">
        <div class="info-point">
          <div class="info-data">{{ block.transactions }}</div>
          <div class="info-title">Transactions</div>
        </div>
        <div class="info-point">
          <div class="info-data">{{ block.timestamp }}</div>
          <div class="info-title">Timestamp</div>
        </div>
        <div class="info-point">
          <div class="info-data">{{ block.size }}</div>
          <div class="info-title">Size in Bytes</div>
        </div>
      </div>
      <div class="vertical-divider"></div>
      <div class="info-block">
        <div class="info-point">
          <div class="info-data break-word">{{ block.operator }}</div>
          <div class="info-title">Operator Address</div>
        </div>
        <div class="info-point">
          <div class="info-data break-word">{{ block.hash }}</div>
          <div class="info-title">Block Hash</div>
        </div>
      </div>
    </div>
    <div class="view-header">Transactions</div>
    <table>
      <tr class="table-header">
        <th v-for="header in headers" :key="header.value">
          {{ header.text }}
        </th>
      </tr>
      <router-link tag="tr" v-for="tx in txs" :key="tx.hash" :to="{ name: 'transaction', params: { hash: tx.hash } }" class="table-row">
        <td class="blue-link"><div class="rainbow-left"></div>{{ tx.hash }}</td>
        <td>{{ tx.timestamp }}</td>
        <td>{{ tx.transfers }}</td>
      </router-link>
    </table>
  </div>
</template>

<script>
import plasma from '../services/client-service'

const ITEMS_PER_PAGE = 10

export default {
  data () {
    return {
      headers: [
        {
          text: 'TXID',
          value: 'hash'
        },
        {
          text: 'Timestamp',
          value: 'timestamp'
        },
        {
          text: 'Transfers',
          value: 'transfers'
        }
      ],
      block: {},
      txs: []
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

      plasma.getTransactionsInBlock(number, start, end).then((txs) => {
        this.txs = txs.reverse()
        this.txs = this.txs.map((tx) => {
          tx.timestamp = 12392139123
          tx.transfers = 0
          return tx
        })
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
