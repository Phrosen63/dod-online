import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { firestorePlugin } from 'vuefire';
import Vuex from 'vuex';

import store from './store/index';

Vue.use(firestorePlugin);

Vue.config.productionTip = false;
Vue.use(Vuex);

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app');
