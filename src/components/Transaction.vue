<template>
  <v-container
    id="grid"
    grid-list-md
  >
    <v-layout row wrap>
      <v-flex>
        <div class="content elevation-5">
          <h2 class="item-hash">Transaction <span class="font-weight-light">{{ $route.params.hash }}</span></h2>
          <v-layout row wrap>
            <v-flex xs12 md2 class="property-title">
              Hash:
            </v-flex>
            <v-flex xs12 md10>
              {{ $route.params.hash }}
            </v-flex>

            <v-flex xs12 md2 class="property-title">
              Block:
            </v-flex>
            <v-flex xs12 md10>
              <router-link :to="{ name:'block', params: { number: tx.block } }">{{ tx.block }}</router-link>
            </v-flex>

            <v-flex xs12 md2 class="property-title">
              From:
            </v-flex>
            <v-flex xs12 md10>
              {{ tx.from }}
            </v-flex>

            <v-flex xs12 md2 class="property-title">
              To:
            </v-flex>
            <v-flex xs12 md10>
              {{ tx.to }}
            </v-flex>

            <v-flex xs12 md2 class="property-title">
              Value:
            </v-flex>
            <v-flex xs12 md10>
              {{ tx.val }}
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
        tx: undefined
      }
    },
    mounted () {
      plasma
        .getTransaction(this.$route.params.hash)
        .then((tx) => {
          this.tx = tx
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
