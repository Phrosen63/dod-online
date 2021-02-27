<template>
  <header>
    <nav>
      <router-link to="/lobby">
        Lobby
      </router-link>
      <router-link to="/characters">
        Characters
      </router-link>
      <router-link to="/profile">
        Profile
      </router-link>
    </nav>
    <button
      id="btnLogout"
      @click="logOut"
    >
      Log out
    </button>
  </header>
</template>

<script>
// Modules
import { auth } from '@/api/database/auth';

export default {
  name: 'Header',
  methods: {
    logOut() {
      // Log out user and re-direct to LoginScreen
      auth.signOut();
      if (this.$route.name !== 'LoginScreen') {
        this.$router.push('/');
      }
    },
  },
};
</script>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #fadaa2;
  box-shadow: 0 -10px 20px 10px;
  padding: 5px 0;
  height: 53px;
}

nav {
  display: flex;
  flex-direction: row;
}

nav > a {
  font-size: 20px;
  text-decoration: none;
  height: 40px;
  line-height: 40px;
  padding: 0 15px;
  color: #303030;
}

nav > a:hover {
  background-color: #ffeac4;
}

#btnLogout {
  position: absolute;
  right: 25px;
  border: 0;
  background-color: white;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  min-width: 87px;
}

#btnLogout:hover {
  background-color: #e3e2e1;
}

@media all and (max-width: 550px) {
  header {
    flex-direction: column;
    height: auto;
    padding: 15px 0;
  }

  nav {
    flex-direction: column;
    align-items: center;
    margin: 0 0 15px 0;
  }

  nav > a {
    padding: 0;
  }

  #btnLogout {
    position: unset;
  }
}
</style>
