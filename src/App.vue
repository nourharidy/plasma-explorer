<template>
  <div class="container">
    <div class="home-menu pure-menu pure-menu-horizontal">
      <router-link to="/" class="pure-menu-heading title-header">Plasma Block Explorer</router-link>
      <ul class="pure-menu-list">
        <li class="pure-menu-item">
          <router-link to="/" exact class="pure-menu-link">Dashboard</router-link>
        </li>
        <li class="pure-menu-item">
          <router-link to="/blocks" class="pure-menu-link">Blocks</router-link>
        </li>
        <li class="pure-menu-item">
          <router-link to="/transactions" class="pure-menu-link">Transactions</router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
require('@/assets/css/pure.min.css')
require('@/assets/css/main.scss')

export default {
  name: 'App',
  metaInfo: {
    title: 'Plasma Block Explorer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  }
}
</script>

<style lang="scss">
.home-menu {
  padding: 1.5em 0;
}

.pure-menu-link {
  color: #939393;

  &.router-link-active {
    color: #646665;
  }

  &:last-child {
    padding-right: 0;
  }

  &:hover,
  &:focus {
    background: none
  }
}

@media (min-width: 48em) {
  .home-menu {
    ul {
      float: right;
    }
  }
}
</style>
