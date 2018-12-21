<template>
  <v-container
    id="grid"
    grid-list-md
  >
    <v-layout row wrap>
      <v-flex>
        <div class="content elevation-5">
          <h2 class="item-hash">Block <span class="font-weight-light">#{{ $route.params.number }}</span></h2>
          <v-layout row wrap>
            <v-flex xs12 md2 class="property-title">
              Number:
            </v-flex>
            <v-flex xs12 md10>
              {{ $route.params.number }}
            </v-flex>

            <v-flex xs12 md2 class="property-title">
              Hash:
            </v-flex>
            <v-flex xs12 md10>
              {{ hash }}
            </v-flex>

            <v-flex xs12 md2 class="property-title">
              Transactions:
            </v-flex>
            <v-flex xs12 md10>
              {{ transactions }}
            </v-flex>
          </v-layout>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        hash: '0x0000000000000000000000000000000000000000000000000000000000000000',
        transactions: 0
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
