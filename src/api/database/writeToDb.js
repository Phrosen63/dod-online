import { db } from './db';
import { getFirebaseUser } from './getUserData';

const writeObject = (collectionPath, docName, data) => {
  db.collection(collectionPath).doc(docName).update(data);
};

const createNestedFieldObject = (field, nestedField, value) => {
  const docField = `${field}.${nestedField}`;
  const nestedFieldObject = {};
  nestedFieldObject[docField] = value;
  // Returns { field.nestedFiled: value }
  return nestedFieldObject;
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
  writeNestedObjToCurrentUser,
};
