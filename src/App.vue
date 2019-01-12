<template>
  <div class="app">
    <div class="main-container" v-bind:class="{ toggled: sidebarToggled }">
      <div class="side-menu-touch-detector" v-on:click="closeSidebar"></div>
      <div class="navbar">
        <div class="home-menu">
          <router-link to="/" class="app-title">Plasma Block Explorer</router-link>
          <div class="hamburger-icon" v-on:click="toggleSidebar">
            <font-awesome-icon icon="bars" class="hidden-desktop" />
          </div>
          <ul class="hidden-mobile main-menu">
            <li>
              <router-link to="/" exact>Dashboard</router-link>
            </li>
            <li>
              <router-link to="/blocks">Blocks</router-link>
            </li>
            <li>
              <router-link to="/transactions">Transactions</router-link>
            </li>
          </ul>
        </div>
      </div>
      <router-view></router-view>
    </div>
    <div class="side-menu-container" id="side-menu" v-bind:class="{ toggled: sidebarToggled }">
      <ul class="side-menu hidden-desktop">
        <li><router-link to="/" exact>Dashboard</router-link></li>
        <li><router-link to="/blocks">Blocks</router-link></li>
        <li><router-link to="/transactions">Transactions</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
require('@/assets/css/pure.min.css')
require('@/assets/css/pure-grid.min.css')
require('@/assets/css/main.scss')

const bodyScrollLock = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll = bodyScrollLock.enableBodyScroll;

export default {
  name: 'App',
  metaInfo: {
    title: 'Plasma Block Explorer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },
  data () {
    return {
      sidebarToggled: false
    }
  },
  methods: {
    toggleSidebar () {
      this.sidebarToggled ? this.closeSidebar() : this.openSidebar();
    },
    openSidebar () {
      disableBodyScroll()
      this.sidebarToggled = true
    },
    closeSidebar () {
      enableBodyScroll()
      this.sidebarToggled = false
    }
  }
}
</script>
