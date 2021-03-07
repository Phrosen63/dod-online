<template>
  <header>
    <nav>
      <router-link to="/lobby">
        {{ $t('lobby') }}
      </router-link>
      <router-link to="/characters">
        {{ $t('characters') }}
      </router-link>
      <router-link to="/profile">
        {{ $t('profile') }}
      </router-link>
    </nav>
    <div class="header-button-wrapper">
      <button
        id="btnSwitchLanguage"
        class="header-button"
        @click="switchLanguage"
      >
        {{ $t('switch_language') }}
      </button>
      <button
        id="btnLogout"
        class="header-button"
        @click="logOut"
      >
        {{ $t('log_out') }}
      </button>
    </div>
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
    switchLanguage() {
      if (this.$i18n.locale === 'en') {
        this.$i18n.locale = 'sv';
      } else {
        this.$i18n.locale = 'en';
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

.header-button-wrapper {
  position: absolute;
  right: 25px;
  border: 0;
}

.header-button {
  background-color: white;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
}

#btnSwitchLanguage {
  margin: 0 10px 0 0;
}

#btnLogout {
  min-width: 87px;
}

.header-button:hover {
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

  .header-button-wrapper {
    position: unset;
    display: flex;
    flex-direction: column;
  }

  .header-button {
    margin: 5px 0;
  }
}
</style>
