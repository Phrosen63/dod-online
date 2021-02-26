import { auth } from '@/api/database/auth';
import { addUserDocument } from '@/api/database/write';
import { generateName } from '@/api/randomNameGenerator';

const getFirebaseUser = () => new Promise((resolve, reject) => {
  auth.onAuthStateChanged((userAuth) => {
    resolve(userAuth);
  }, reject);
});

const getUserDisplayName = async () => {
  const currentUser = await getFirebaseUser();
  return currentUser.displayName;
};

const createNewUser = (email, password) => new Promise((resolve, reject) => {
  auth.createUserWithEmailAndPassword(email, password)
  .then(async res => {
    const user = res.user;
    const displayName = generateName();
    const uid = user.uid;

    user.updateProfile({displayName});
    await addUserDocument(uid);

    resolve(user);
  })
  .catch((e) => {
    reject({
      message: e.message,
    });
  });
});

// Export getFirebaseUser methods
export {
  getFirebaseUser,
  getUserDisplayName,
  createNewUser,
};
