<template>
  <div>
    <div class="view-header">Blocks</div>
    <table>
      <tr class="table-header">
        <th v-for="header in headers" :key="header.value">
          {{ header.text }}
        </th>
      </tr>
      <tr v-for="block in blocks" :key="block.number" class="table-row">
        <td class="blue-link"><div class="table-rainbow"></div>{{ block.number }}</td>
        <td>{{ block.size }}</td>
        <td>{{ block.timestamp }}</td>
        <td>{{ block.transactions }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import plasma from '../services/client-service'

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
      blocks: []
    }
  },
  mounted () {
    plasma
      .getBlocks(0, 10)
      .then((blocks) => {
        this.blocks = blocks.reverse()
      })
  }
}
</script>
