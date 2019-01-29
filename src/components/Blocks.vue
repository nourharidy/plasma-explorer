<template>
  <div>
    <div class="mobile-view-header">Blocks</div>
    <div class="mobile-view-container container">
      <router-link tag="div" class="card link-card" v-for="block in blocks" :key="block.blockNumber" :to="{ name: 'block', params: { number: block.blockNumber } }">
        <div class="rainbow-left"></div>
        <div class="main-info">
          <span class="info-label">Block</span> <span class="blue-link"> #{{ block.blockNumber }}</span>
        </div>
        <div><span class="info-label">Timestamp:</span> {{ block.timestamp }}</div>
        <div><span class="info-label">Transactions:</span> {{ block.numTxs }}</div>
      </router-link>
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
      maxPage: 1
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
      this.page = parseInt(this.$route.query.page) || 1
      const start = (this.page - 1) * ITEMS_PER_PAGE
      const end = this.page * ITEMS_PER_PAGE

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
      })
    }
  }
}
</script>
