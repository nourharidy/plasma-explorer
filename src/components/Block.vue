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
              {{ block.hash }}
            </v-flex>

            <v-flex xs12 md2 class="property-title">
              Transactions:
            </v-flex>
            <v-flex xs12 md10>
              {{ block.transactions }}
            </v-flex>
          </v-layout>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import plasma from '../services/client-service'

  export default {
    data () {
      return {
        block: undefined
      }
    },
    mounted () {
      plasma
        .getBlock(this.$route.params.number)
        .then((block) => {
          this.block = block
        })
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
