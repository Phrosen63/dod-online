import Vue from 'vue';
import Vuex from 'vuex';
import { firestorePlugin } from 'vuefire';
import App from './App.vue';
import router from './router';
import VModal from 'vue-js-modal';

import store from './store/index';

require('uuidv4');

Vue.config.productionTip = false;
Vue.use(firestorePlugin);
Vue.use(Vuex);
Vue.use(VModal);

new Vue({
  router,
  store,
  render(h) { return h(App); },
}).$mount('#app');
