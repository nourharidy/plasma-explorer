<template>
  <div>
    <div class="mobile-view-header">Blocks</div>
    <div class="navbar-buffer"></div>
    <div class="text-center" v-if="loading">
      <div class="lds-heart"><div></div></div>
    </div>
    <div class="container" v-if="!loading && !error">
      <div class="mobile-sub-header">Blocks</div>
      <router-link tag="div" class="card link-card" v-for="block in blocks" :key="block.blockNumber" :to="{ name: 'block', params: { number: block.blockNumber } }">
        <div class="rainbow-left"></div>
        <div class="main-info">
          <span class="info-label">Block</span> <span class="blue-link"> #{{ block.blockNumber }}</span>
        </div>
        <div><span class="info-label">Timestamp:</span> {{ block.timestamp }}</div>
        <div><span class="info-label">Transactions:</span> {{ block.numTxs }}</div>
      </router-link>
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

const ITEMS_PER_PAGE = 10

export default {
  data () {
    return {
      blocks: [],
      page: 1,
      maxPage: 1,
      loading: true,
      error: false
    }
  },
  watch: {
    '$route.query.page': function () {
      this.loadBlocks()
    }
  },
  mounted () {
    this.loadBlocks()

  },
  methods: {
    cleanTimestamp (timestamp) {
      timestamp = new BigNum(timestamp, 'hex').toString()
      const date = new Date()
      date.setTime(timestamp)
      return date.toUTCString()
    },
    loadBlocks () {
      this.loading = true
      this.page = parseInt(this.$route.query.page) || 1

      plasma.operator.getCurrentBlock().then((end) => {
        this.maxPage = Math.ceil(end / ITEMS_PER_PAGE)
        let start = end - ITEMS_PER_PAGE
        start = start >= 1 ? start : 1
        return plasma.operator.getBlockMetadata(start, end)
      }).then((blocks) => {
        blocks.forEach((block) => {
          block.timestamp = this.cleanTimestamp(block.timestamp)
        })
        this.blocks = blocks.reverse()
        this.loading = false
      }).catch(() => {
        this.loading = false
        this.error = true
      })
    }
  }
}
</script>
