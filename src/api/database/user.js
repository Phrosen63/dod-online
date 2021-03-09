import { db } from '@/api/database/db';
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
  auth.createUserWithEmailAndPassword(email, password).then(async res => {
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

const getUserSettings = () => new Promise((resolve, reject) => {
  auth.onAuthStateChanged((userAuth) => {
    if(userAuth) {
      const { uid } = userAuth;

      if(uid) {
        const SETTINGS_COLLECTION = `/users/${uid}/settings`;
        db.collection(SETTINGS_COLLECTION).get().then(snapshot => {
          snapshot.docs.map((doc) => {
            const data = doc.data();

            const settings = {
              id: doc.id || undefined,
              displayName: userAuth.displayName,
              email: userAuth.email,
              role: data.role || 4,
              language: data.language || 'en',
            };

            resolve(settings);
          });
        });
      }
    }
  }, reject);
});

// Export getFirebaseUser methods
export {
  getFirebaseUser,
  getUserDisplayName,
  createNewUser,
  getUserSettings,
};
