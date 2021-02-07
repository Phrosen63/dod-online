<template>
  <header>
    <button
      id="btnLogout"
      class="hide"
      @click="logOut"
    >
      Log out
    </button>
  </header>
</template>

<script>
import { auth } from '@/api/auth';

export default {
  name: 'Header',
  methods: {
    logOut() {
      // Log out user and re-direct to LoginScreen
      auth.signOut();
      this.$router.push('/');
    },
  },
}
</script>

<style>
header {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  background-color: #fadaa2;
  box-shadow: 0px -10px 20px 10px;
  padding: 5px 0;
}

#btnLogout {
  border: 0;
  background-color: white;
  font-size: 20px;
  margin-right: 25px;
  padding: 10px;
  cursor: pointer;
}

#btnLogout:hover {
  background-color: #e3e2e1;
}
</style>
