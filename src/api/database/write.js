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

// Export methods
export {
  writeObject,
  createNestedFieldObject,
  createDoubleNestedFieldObject,
  writeNestedObjToCurrentUser,
};
