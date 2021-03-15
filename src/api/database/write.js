import { db } from '@/api/database/db';
import { getFirebaseUser } from '@/api/database/user';

const writeObject = (collectionPath, docName, data) => {
  db.collection(collectionPath).doc(docName).set(data);
};

const writeObjectToCurrentUser = async (userCollection, docName, obj) => {
  const currentUser = await getFirebaseUser();
  const { uid } = currentUser;
  const collectionPath = `/users/${uid}/${userCollection}`;
  db.collection(collectionPath).doc(docName).set(obj);
};

const writeNestedObjToCurrentUser = async (userCollection, docName, obj) => {
  const currentUser = await getFirebaseUser();
  const { uid } = currentUser;
  const collectionPath = `/users/${uid}/${userCollection}`;
  db.collection(collectionPath).doc(docName).set(obj);
};

const createDocumentFieldObject = ({ map, key, value }) => {
  const object = {};
  object[`${map}.${key}`] = value;
  return object;
};

const updateDocumentFieldForCurrentUser = async ({ collection, document, data }) => {
  const currentUser = await getFirebaseUser();
  const { uid } = currentUser;
  const collectionPath = `/users/${uid}/${collection}`;
  return db.collection(collectionPath).doc(document).update(data);
};

const writeNewObjToCurrentUser = async (userCollection, nestedObject) => {
  const currentUser = await getFirebaseUser();
  const { uid } = currentUser;
  const collectionPath = `/users/${uid}/${userCollection}`;
  return db.collection(collectionPath).add(nestedObject).then(docRef => docRef.id);
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
  writeObjectToCurrentUser,
  writeNestedObjToCurrentUser,
  createDocumentFieldObject,
  updateDocumentFieldForCurrentUser,
  writeNewObjToCurrentUser,
  addUserDocument,
};
