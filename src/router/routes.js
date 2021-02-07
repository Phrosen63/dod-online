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
    component: () => import('../views/Lobby.vue'),
  },
  {
    path: '/characters',
    name: 'Characters',
    component: () => import('../views/Characters.vue'),
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
  },
];

// Export routes
export default routes;
