import firebase from 'firebase/app';
import { firebaseConfig } from './fbconfig';

// Export firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
