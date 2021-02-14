import { firebaseApp } from '@/api/database/fb';

// eslint-disable-next-line no-undef
require('firebase/auth');

const auth = firebaseApp.auth();

// Export firebase auth
export {
  auth,
};
