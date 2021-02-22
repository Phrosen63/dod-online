import { firebaseApp } from '@/api/database/fb';

require('firebase/auth');

const auth = firebaseApp.auth();

// Export firebase auth
export {
  auth,
};
