<template>
  <div id="app">
    <Header />
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header';

// import { db } from '@/api/db';
// import { auth } from '@/api/auth';
// import { firebaseApp } from '@/api/fb';

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
