import { db } from '@/api/database/db';
import { getFirebaseUser } from '@/api/database/user';

const deleteDocumentFromCurrentUser = async (docPath, docId) => {
  const currentUser = await getFirebaseUser();
  const { uid } = currentUser;

  const collectionPath = `/users/${uid}/${docPath}`;
  db.collection(collectionPath).doc(docId).delete();
};

// Export methods
export {
  deleteDocumentFromCurrentUser,
};
