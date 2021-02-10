import { firebaseApp } from './fb';

require('firebase/auth');

const auth = firebaseApp.auth();

// Export firebase auth
export {
  auth,
};
