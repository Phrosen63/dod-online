import { db } from './db';
import { getFirebaseUser } from './getUserData';

const createNestedFieldObject = (field, nestedField, value) => {
  const docField = `${field}.${nestedField}`;
  const nestedFieldObject = {};
  nestedFieldObject[docField] = value;
  // Returns { field.nestedFiled: value }
  return nestedFieldObject;
};

const writeNestedObj = (collectionPath, docName, nestedObject) => {
  db.collection(collectionPath).doc(docName).update(nestedObject);
};

const writeNestedObjToCurrentUser = async (userCollection, docName, nestedObject) => {
  const currentUser = await getFirebaseUser();
  const { uid } = currentUser;
  const collectionPath = `/users/${uid}/${userCollection}`;
  db.collection(collectionPath).doc(docName).update(nestedObject);
};

// Export methods
export {
  createNestedFieldObject,
  writeNestedObj,
  writeNestedObjToCurrentUser,
};
