import { auth } from './auth';

const getFirebaseUser = () => new Promise((resolve, reject) => {
  const unsubscribe = auth.onAuthStateChanged((userAuth) => {
    unsubscribe();
    resolve(userAuth);
  }, reject);
});

const getUserDisplayName = async () => {
  const currentUser = await getFirebaseUser();
  return currentUser.displayName;
};

// Export getFirebaseUser
export {
  getFirebaseUser,
  getUserDisplayName,
};
