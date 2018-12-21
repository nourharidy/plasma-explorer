<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Explorer</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
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
