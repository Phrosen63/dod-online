import firebase from 'firebase/app';
import { firebaseConfig } from './config/fbconfig';

// Export firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
