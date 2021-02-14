<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
// Components
import Header from '@/components/Header';
import { getFirebaseUser } from '@/api/database/user';

export default {
  name: 'App',
  components: {
    Header,
  },
  async beforeCreate() {
    const currentUser = await getFirebaseUser();
    if(!currentUser) {
      if (this.$route.name !== 'LoginScreen') {
        this.$router.push('/');
      }
    }
  },
};
</script>

<style>
@import './assets/styles/style.css';
</style>
