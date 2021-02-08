import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import { firestorePlugin } from 'vuefire';

import store from './store/index';


Vue.config.productionTip = false;
Vue.use(firestorePlugin);
Vue.use(Vuex);

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app');
