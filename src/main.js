import Vue from 'vue';
import Vuex from 'vuex';
import { firestorePlugin } from 'vuefire';
import App from './App.vue';
import router from './router';
import VModal from 'vue-js-modal';

import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'

import store from './store/index';

Vue.config.productionTip = false;
Vue.use(firestorePlugin);
Vue.use(Vuex);
Vue.use(VModal);
Vue.use(VueTabs)

new Vue({
  router,
  store,
  render(h) { return h(App); },
}).$mount('#app');
