import firebase from 'firebase/app';
import { firebaseConfig } from '../config/fbconfig';

// Export firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export {
  firebaseApp,
};
