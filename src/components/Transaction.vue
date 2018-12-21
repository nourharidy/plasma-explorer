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
              <router-link :to="{ name:'block', params: { number: block } }">{{ block }}</router-link>
            </v-flex>

            <v-flex xs12 md2 class="property-title">
              From:
            </v-flex>
            <v-flex xs12 md10>
              {{ from }}
            </v-flex>

            <v-flex xs12 md2 class="property-title">
              To:
            </v-flex>
            <v-flex xs12 md10>
              {{ to }}
            </v-flex>

            <v-flex xs12 md2 class="property-title">
              Value:
            </v-flex>
            <v-flex xs12 md10>
              {{ val }}
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
        block: 1,
        from: '0x0000000000000000000000000000000000000000',
        to: '0x0000000000000000000000000000000000000000',
        val: 0
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
