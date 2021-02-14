import { firebaseApp } from '@/api/database/fb';
import 'firebase/firestore';

const db = firebaseApp.firestore();
db.settings({ timestampsInSnapshots: true });

// Export firestore
export {
  db,
};
