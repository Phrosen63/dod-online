import firebase from 'firebase/app';
import { db } from '@/api/database/db';
import { getFirebaseUser } from '@/api/database/getUserData';

const deleteNestedFieldFromCurrentUser = async (docName, title) => {
  const currentUser = await getFirebaseUser();
  const { uid } = currentUser;

  const collectionPath = `/users/${uid}/characters`;
  const updates = {};
  updates[`notes.${title}`] = firebase.firestore.FieldValue.delete();

  const charDoc = db.collection(collectionPath).doc(docName);
  charDoc.update(updates);
};

// Export methods
export {
  deleteNestedFieldFromCurrentUser,
};
