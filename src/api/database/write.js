import { db } from '@/api/database/db';
import { getFirebaseUser } from '@/api/database/user';

const writeObject = (collectionPath, docName, data) => {
  db.collection(collectionPath).doc(docName).update(data);
};

const createNestedFieldObject = (field, nestedField, value) => {
  const object = {};
  object[`${field}.${nestedField}`] = value;
  return object;
};

const createDoubleNestedFieldObject = (field, nestedField, doubleNestedField, value) => {
  const object = {};
  object[`${field}.${nestedField}.${doubleNestedField}`] = value;
  return object;
};

const writeNestedObjToCurrentUser = async (userCollection, docName, nestedObject) => {
  const currentUser = await getFirebaseUser();
  const { uid } = currentUser;
  const collectionPath = `/users/${uid}/${userCollection}`;
  db.collection(collectionPath).doc(docName).update(nestedObject);
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

  await db.collection(USER_COLLECTION).doc(uid).set({});
  await db.collection(CHARACTER_COLLECTION).doc(uid);
  await db.collection(SETTINGS_COLLECTION).add({role: 2});
};

// Export methods
export {
  writeObject,
  createNestedFieldObject,
  createDoubleNestedFieldObject,
  writeNestedObjToCurrentUser,
  writeNewObjToCurrentUser,
  addUserDocument,
};
