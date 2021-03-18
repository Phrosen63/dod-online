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
      <router-link to="/users">
        {{ $t('users') }}
      </router-link>
    </nav>
    <div class="header-button-wrapper">
      <button
        id="btnSwitchLanguage"
        :title="$t('switch_language')"
        @click="switchLanguage"
      >
        <img
          v-if="language === 'sv'"
          src="@/assets/flag_swe.svg"
          alt="Swedens flag"
          class="header-flag header-flag--swe"
        >
        <img
          v-if="language === 'en'"
          src="@/assets/flag_uk.svg"
          alt="The flag of the United Kingdom"
          class="header-flag header-flag--uk"
        >
      </button>
      <button
        id="btnLogout"
        class="header-button"
        @click="logOut"
      >
        {{ $t('log_out') }}
      </button>
      <span class="hide">Icons made by <a href="https://www.freepik.com">Freepik</a> from <a href="https://www.flaticon.com/">www.flaticon.com</a></span>
    </div>
  </header>
</template>

<script>
// Modules
import { auth } from '@/api/database/auth';

export default {
  name: 'Header',
  computed: {
    language() {
      return this.$store.state.settings.language;
    },
  },
  methods: {
    logOut() {
      // Log out user and re-direct to LoginScreen
      const language = 'en';

      this.$i18n.locale = language;
      this.$store.commit('updateLanguage', {
        data: {
          value: language,
        },
      });

      auth.signOut();
      if (this.$route.name !== 'LoginScreen') {
        this.$router.push('/');
      }
    },
    switchLanguage() {
      const data = {};

      if (this.$i18n.locale === 'en') {
        this.$i18n.locale = 'sv';
        data.value = 'sv';
      } else {
        this.$i18n.locale = 'en';
        data.value = 'en';
      }

      this.$store.commit('updateLanguage', {
        data,
      });
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
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 0;
}

.header-button {
  background-color: white;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
}

#btnSwitchLanguage {
  margin: 0 15px 0 0;
  padding: 0;
  border: 0;
  background-color: transparent;
  cursor: pointer;
}

#btnLogout {
  min-width: 87px;
}

.header-button:hover {
  background-color: #e3e2e1;
}

.header-flag {
  width: 50px;
}

@media all and (max-width: 768px) {
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

  #btnSwitchLanguage {
    margin: 0;
  }
}
</style>
