<template>
  <div id="app">
    <Header />
    <router-view/>
  </div>
</template>

<script>
// Components
import Header from '@/components/Header';

export default {
  name: 'App',
  components: {
    Header,
  },
}
</script>

<style>
@import './assets/styles/style.css';
</style>
