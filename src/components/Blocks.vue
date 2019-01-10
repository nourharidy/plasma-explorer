<template>
  <div>
    <div class="view-header">Blocks</div>
    <table>
      <tr class="table-header">
        <th v-for="header in headers" :key="header.value">
          {{ header.text }}
        </th>
      </tr>
      <router-link tag="tr" v-for="block in blocks" :key="block.number" :to="{ name: 'block', params: { number: block.number } }" class="table-row">
        <td class="blue-link"><div class="rainbow-left"></div>{{ block.number }}</td>
        <td>{{ block.size }}</td>
        <td>{{ block.timestamp }}</td>
        <td>{{ block.transactions }}</td>
      </router-link>
    </table>
    <div class="pagination">
      <router-link :to="{ query: { page: (page - 1) }}" class="page-prev" v-bind:class="{ disabled: (page === 1) }">&lt;</router-link>
      <div class="page-current">{{ page }} of {{ maxPage }}</div>
      <router-link :to="{ query: { page: (page + 1) }}" class="page-next" v-bind:class="{ disabled: (page === maxPage) }">&gt;</router-link>
    </div>
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
          text: 'Height',
          value: 'height'
        },
        {
          text: 'Size',
          value: 'size'
        },
        {
          text: 'Timestamp',
          value: 'timestamp'
        },
        {
          text: 'Number of Transactions',
          value: 'transactions'
        }
      ],
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

    plasma.getHeight().then((height) => {
      this.maxPage = Math.ceil(height / ITEMS_PER_PAGE)
    })
  },
  methods: {
    loadBlocks () {
      this.page = parseInt(this.$route.query.page) || 1
      const start = (this.page - 1) * ITEMS_PER_PAGE
      const end = this.page * ITEMS_PER_PAGE

      plasma.getBlocks(start, end).then((blocks) => {
        this.blocks = blocks.reverse()
      })
    }
  }
}
</script>
