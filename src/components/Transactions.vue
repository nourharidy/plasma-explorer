<template>
  <v-container
    id="grid"
    grid-list-md
  >
    <v-data-table
      :headers="headers"
      :items="transactions"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <router-link tag="tr" class="table-row" :to="{ name: 'transaction', params: { hash: props.item.hash } }">
          <td>{{ props.item.hash }}</td>
          <td>{{ props.item.block }}</td>
          <td>{{ props.item.from }}</td>
          <td>{{ props.item.to }}</td>
          <td>{{ props.item.val }}</td>
          <td>{{ props.item.fee }}</td>
        </router-link>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
  import plasma from '../services/client-service'

  export default {
    data () {
      return {
        headers: [
          {
            text: 'Hash',
            align: 'left',
            sortable: false,
            value: 'hash'
          },
          {
            text: 'Block',
            align: 'left',
            sortable: false,
            value: 'block'
          },
          {
            text: 'From',
            align: 'left',
            sortable: false,
            value: 'from'
          },
          {
            text: 'To',
            align: 'left',
            sortable: false,
            value: 'to'
          },
          {
            text: 'Value',
            align: 'left',
            sortable: false,
            value: 'value'
          },
          {
            text: 'Fee',
            align: 'left',
            sortable: false,
            value: 'fee'
          }
        ],
        transactions: []
      }
    },
    mounted () {
      plasma
        .getTransactions()
        .then((txs) => {
          this.transactions = txs
        })
    }
  }
</script>

<style>
.table-row {
  cursor: pointer;
}
</style>
