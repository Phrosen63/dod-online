<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
// Components
import Header from '@/components/Header';

// Modules
import { getUserSettings } from '@/api/database/user';

export default {
  name: 'App',
  components: {
    Header,
  },
  async beforeCreate() {
    const settings = await getUserSettings();

    if (settings) {
      this.$i18n.locale = settings.language;
      this.$store.commit('updateLanguage', {
        data: {
          value: settings.language,
        },
      });

      this.$store.commit('updateRole', {
        data: {
          value: settings.role,
        },
      });

      this.$store.commit('updateSettingsId', {
        data: {
          value: settings.id,
        },
      });

      this.$store.commit('updateUserDisplayName', {
        data: {
          value: settings.displayName,
        },
      });

      this.$store.commit('updateUserEmail', {
        data: {
          value: settings.email,
        },
      });
    } else {
      // User is logged in
      if (this.$route.name !== 'LoginScreen') {
        // Redirect user to LoginScreen
        this.$router.push('/');
      }
    }
  },
};
</script>

<style>
@import './assets/styles/style.css';
@import './assets/styles/grid.css';
</style>
