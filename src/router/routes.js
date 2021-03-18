import LoginScreen from '../views/LoginScreen.vue';
import Lobby from '../views/Lobby.vue';
import Characters from '../views/Characters.vue';
import Profile from '../views/Profile.vue';
import Users from '../views/Users.vue';

const routes = [
  {
    path: '/',
    name: 'LoginScreen',
    component: LoginScreen,
  },
  {
    path: '/lobby',
    name: 'Lobby',
    component: Lobby,
  },
  {
    path: '/characters',
    name: 'Characters',
    component: Characters,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
  },
];

// Export routes
export default routes;
