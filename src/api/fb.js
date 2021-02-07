import firebase from 'firebase/app';

// Firebase config
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

// Export firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);
