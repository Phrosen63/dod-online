import { db } from '@/api/database/db';

const writeObject = ({ collectionPath, document, data }) => {
  return db.collection(collectionPath).doc(document).set(data);
};

const writeNewObject = async ({ collectionPath, data }) => {
  return await db.collection(collectionPath).add(data).then(docRef => docRef.id);
};

const createDocumentFieldObject = ({ map, key, value }) => {
  const object = {};
  object[`${map}.${key}`] = value;
  return object;
};

const updateDocument = async ({ collectionPath, document, data }) => {
  return db.collection(collectionPath).doc(document).update(data);
};

const addUserDocument = async (uid) => {
  const USERS_COLLECTION = `/users/`;
  const SETTINGS_COLLECTION = `/users/${uid}/settings/`;
  const ROLES_COLLECTION = `/roles/`;

  const usersRef = db.collection(USERS_COLLECTION).doc(uid);
  usersRef.get().then(async (snapshot) => {
    if (!snapshot.exists) {
      await db.collection(USERS_COLLECTION).doc(uid).set({});
      await db.collection(SETTINGS_COLLECTION).add({ language: 'en' });
      await db.collection(ROLES_COLLECTION).doc(uid).set({
        role: 3,
      });
    }
  });
};

// Export methods
export {
  writeObject,
  writeNewObject,
  createDocumentFieldObject,
  updateDocument,
  addUserDocument,
};
