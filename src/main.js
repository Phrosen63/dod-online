import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';

// Firestore
import { firestorePlugin } from 'vuefire';

// Vue router
import router from './router';

// Modal
import VModal from 'vue-js-modal';

// Tabs
import VueTabs from 'vue-nav-tabs';
import 'vue-nav-tabs/themes/vue-tabs.css';

// Store
import store from './store/index';

// Translations
import i18n from './i18n/i18n';

Vue.config.productionTip = false;
Vue.use(firestorePlugin);
Vue.use(Vuex);
Vue.use(VModal);
Vue.use(VueTabs);

new Vue({
  router,
  store,
  i18n,
  render(h) { return h(App); },
}).$mount('#app');
