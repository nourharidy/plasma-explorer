<template>
  <v-data-table
    :headers="headers"
    :items="blocks"
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
      <router-link tag="tr" :to="{ name: 'block', params: { number: props.item.number } }">
        <td>{{ props.item.number }}</td>
        <td>{{ props.item.hash }}</td>
        <td>{{ props.item.transactions }}</td>
      </router-link>
    </template>
  </v-data-table>
</template>

<script>
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
        blocks: [
          {
            value: false,
            number: 1,
            hash: '0x0000000000000000000000000000000000000000000000000000000000000000',
            transactions: 0,
          },
          {
            value: false,
            number: 2,
            hash: '0x0000000000000000000000000000000000000000000000000000000000000000',
            transactions: 0,
          },
          {
            value: false,
            number: 3,
            hash: '0x0000000000000000000000000000000000000000000000000000000000000000',
            transactions: 0,
          },
          {
            value: false,
            number: 4,
            hash: '0x0000000000000000000000000000000000000000000000000000000000000000',
            transactions: 0,
          },
          {
            value: false,
            number: 5,
            hash: '0x0000000000000000000000000000000000000000000000000000000000000000',
            transactions: 0,
          },
          {
            value: false,
            number: 6,
            hash: '0x0000000000000000000000000000000000000000000000000000000000000000',
            transactions: 0,
          },
          {
            value: false,
            number: 7,
            hash: '0x0000000000000000000000000000000000000000000000000000000000000000',
            transactions: 0,
          }
        ]
      }
    }
  }
</script>
