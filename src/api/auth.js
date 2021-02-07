import { firebaseApp } from './fb';
require('firebase/auth');

// Export firebase auth
export const auth = firebaseApp.auth();
