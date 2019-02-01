<template>
  <div>
    <div class="mobile-view-header ellipsis">Transaction <span class="no-text-transform">{{ this.$route.params.hash }}</span></div>
    <div class="navbar-buffer"></div>
    <div class="text-center" v-if="loading">
      <div class="lds-heart"><div></div></div>
    </div>
    <div class="container" v-if="!loading && !error">
      <router-link tag="div" class="card link-card" :to="{ name: 'block', params: { number: block.blockNumber } }">
        <div class="rainbow-left"></div>
        <div class="main-info">
          <span class="info-label">Block</span> <span class="blue-link"> #{{ block.blockNumber }}</span>
        </div>
        <div><span class="info-label">Timestamp:</span> {{ block.timestamp }}</div>
      </router-link>
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
    <div class="container" v-if="error">
      <div class="card text-center">
        Whoops, something broke. This probably means there's an error on our end.
      </div>
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
      transfer: {},
      pending: true,
      transaction: {
        transfers: []
      },
      block: {},
      loading: true,
      error: false,
      hash: undefined
    }
  },
  mounted () {
    this.hash = this.$route.params.hash
    this.loadItems()
  },
  methods: {
    cleanTimestamp (timestamp) {
      timestamp = new BigNum(timestamp, 'hex').toString()
      const date = new Date()
      date.setTime(timestamp)
      return date.toUTCString()
    },
    tokenToTicker (token) {
      // TODO: Just temporary. Should be a better way later.
      const tickers = {
        '0': 'ETH'
      }
      return tickers[token]
    },
    loadItems () {
      plasma.operator.getTransaction(this.hash).then((transaction) => {
        this.transaction = new UnsignedTransaction(transaction)
        this.transaction.transfers.forEach((transfer) => {
          transfer.amount = transfer.end.sub(transfer.start).toString(10)
          transfer.token = this.tokenToTicker(transfer.token)
        })
        return plasma.operator.getBlockMetadata(this.transaction.block.toString(16))
      }).then((blocks) => {
        if (blocks === undefined) {
          return
        }
        const block = blocks[0]
        block.timestamp = this.cleanTimestamp(block.timestamp)
        block.blockNumber = new BigNum(block.blockNumber, 16).toString(10)
        this.block = block
      }).catch((err) => {
        this.error = true
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
