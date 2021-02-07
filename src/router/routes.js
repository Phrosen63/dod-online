import LoginScreen from '../views/LoginScreen.vue';

const routes = [
  {
    path: '/',
    name: 'LoginScreen',
    component: LoginScreen,
  },
  {
    path: '/lobby',
    name: 'Lobby',
    component: function () {
      return import('../views/Lobby.vue');
    },
  },
];

// Export routes
export default routes;
