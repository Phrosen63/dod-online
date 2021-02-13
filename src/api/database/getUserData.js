import { auth } from './auth';

const getFirebaseUser = () => new Promise((resolve, reject) => {
  const unsubscribe = auth.onAuthStateChanged((userAuth) => {
    unsubscribe();
    resolve(userAuth);
  }, reject);
});

// Export getFirebaseUser
export {
  getFirebaseUser,
};
