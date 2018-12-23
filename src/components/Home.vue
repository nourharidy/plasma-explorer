<template>
  <v-container
    id="grid"
    grid-list-md
  >
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-data-table
          :headers="blockHeaders"
          :items="blocks"
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <router-link tag="tr" class="table-row" :to="{ name: 'block', params: { number: props.item.number } }">
              <td>{{ props.item.number }}</td>
              <td>{{ props.item.transactions }}</td>
            </router-link>
          </template>
        </v-data-table>
      </v-flex>
      <v-flex xs12 md6>
        <v-data-table
          :headers="txHeaders"
          :items="txs"
          class="elevation-1"
          xs12 md6
        >
          <template slot="items" slot-scope="props">
            <router-link tag="tr" class="table-row" :to="{ name: 'block', params: { number: props.item.number } }">
              <td>{{ props.item.hash }}</td>
              <td>{{ props.item.to }}</td>
              <td>{{ props.item.from }}</td>
              <td>{{ props.item.val }}</td>
            </router-link>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import plasma from '../services/client-service'

  export default {
    data () {
      return {
        blockHeaders: [
          {
            text: 'Block Number',
            align: 'left',
            sortable: false,
            value: 'number'
          },
          {
            text: 'Transactions',
            align: 'left',
            sortable: false,
            value: 'transactions'
          }
        ],
        blocks: [],
        txHeaders: [
          {
            text: 'Hash',
            align: 'left',
            sortable: false,
            value: 'hash'
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
            value: 'val'
          }
        ],
        txs: []
      }
    },
    mounted () {
      plasma
        .getBlocks(0, 10)
        .then((blocks) => {
          this.blocks = blocks
        })
      plasma
        .getTransactions()
        .then((txs) => {
          this.txs = txs
        })
    }
  }
</script>

<style>
.table-row {
  cursor: pointer;
}
</style>
