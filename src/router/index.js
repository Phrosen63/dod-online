import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginScreen from '../views/LoginScreen.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'LoginScreen',
    component: LoginScreen,
  },
  {
    path: '/about',
    name: 'About',
    component: function () {
      return import('../views/About.vue');
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
