<template>
  <div>
    <p>This is the Lobby page!</p>
  </div>
</template>

<script>
import { auth } from '@/api/auth';

export default {
  name: 'Lobby',
  created() {
    auth.onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        // User is logged in
        this.$store.commit('setUser', firebaseUser);
        const btnLogout = document.getElementById('btnLogout');
        btnLogout.classList.remove('hide');
      } else {
        // User is not logged in
        this.$router.push('/');
      }
    });
  },
}
</script>
