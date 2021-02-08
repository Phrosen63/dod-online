<template>
  <div id="app">
    <Header />
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header';

// import { db } from '@/api/db';
import { auth } from '@/api/auth';
// import { firebaseApp } from '@/api/fb';

export default {
  name: 'App',
  components: {
    Header,
  },
  created() {
    auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        // User is logged in
        this.$store.commit('setUser', firebaseUser);
        const btnLogout = document.getElementById('btnLogout');
        btnLogout.classList.remove('hide');
        if (this.$route.name === 'LoginScreen') {
          this.$router.push('Lobby');
        }
      } else {
        // User is not logged in
        if (this.$route.name !== 'LoginScreen') {
          this.$router.push('/');
        }
      }
    });
  },
}
</script>

<style>
@import './assets/styles/style.css';
</style>
