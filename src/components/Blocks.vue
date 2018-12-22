<template>
  <v-container
    id="grid"
    grid-list-md
  >
    <v-data-table
      :headers="headers"
      :items="blocks"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <router-link tag="tr" class="table-row" :to="{ name: 'block', params: { number: props.item.number } }">
          <td>{{ props.item.number }}</td>
          <td>{{ props.item.hash }}</td>
          <td>{{ props.item.transactions }}</td>
        </router-link>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
  const plasma = require('plasma-client')

  const provider = new plasma.providers.DummyProvider()
  const client = new plasma.PlasmaClient(provider)

  export default {
    data () {
      return {
        headers: [
          {
            text: 'Block Number',
            align: 'left',
            sortable: false,
            value: 'number'
          },
          {
            text: 'Hash',
            align: 'left',
            sortable: false,
            value: 'hash'
          },
          {
            text: 'Transactions',
            align: 'left',
            sortable: false,
            value: 'transactions'
          }
        ],
        blocks: []
      }
    },
    mounted () {
      client
        .getBlocks(0, 10)
        .then((blocks) => { this.blocks = blocks })
    }
  }
</script>

<style>
.table-row {
  cursor: pointer;
}
</style>
