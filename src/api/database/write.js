import { db } from '@/api/database/db';
import { getFirebaseUser } from '@/api/database/user';

const writeObject = (collectionPath, docName, data) => {
  db.collection(collectionPath).doc(docName).update(data);
};

const writeNestedObjToCurrentUser = async (userCollection, docName, nestedObject) => {
  const currentUser = await getFirebaseUser();
  const { uid } = currentUser;
  const collectionPath = `/users/${uid}/${userCollection}`;
  db.collection(collectionPath).doc(docName).update(nestedObject);
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
  const USER_COLLECTION = `/users/`;
  const CHARACTER_COLLECTION = `/users/${uid}/characters/`;
  const SETTINGS_COLLECTION = `/users/${uid}/settings/`;
  const ROLES_COLLECTION = `/roles/${uid}`;

  await db.collection(USER_COLLECTION).doc(uid).set({});
  await db.collection(CHARACTER_COLLECTION).doc(uid);
  await db.collection(SETTINGS_COLLECTION).add({language: 'en'});
  await db.collection(ROLES_COLLECTION).add({role: 4});
};

// Export methods
export {
  writeObject,
  writeNestedObjToCurrentUser,
  createDocumentFieldObject,
  updateDocumentFieldForCurrentUser,
  writeNewObjToCurrentUser,
  addUserDocument,
};
