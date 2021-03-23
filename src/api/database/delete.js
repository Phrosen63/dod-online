import { db } from '@/api/database/db';

const deleteDocument = async ({ collectionPath, docId }) => {
  db.collection(collectionPath).doc(docId).delete();
};

// Export methods
export {
  deleteDocument,
};
