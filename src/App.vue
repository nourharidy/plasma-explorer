<template>
  <v-app>
    <v-toolbar app>
      <router-link to="/" tag="v-toolbar-title" class="headline text-uppercase">
        <span>Plasma Block Explorer</span>
      </router-link>
      <v-spacer></v-spacer>
      <v-btn flat to="/dashboard">
        <span class="mr-2">Dashboard</span>
      </v-btn>
      <v-btn flat to="/blocks">
        <span class="mr-2">Blocks</span>
      </v-btn>
      <v-btn flat to="/transactions">
        <span class="mr-2">Transactions</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.headline {
  cursor: pointer;
}
</style>
