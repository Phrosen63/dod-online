import { firebaseApp } from './fb';
import 'firebase/firestore';

// Export firestore
export const db = firebaseApp.firestore();

db.settings({ timestampsInSnapshots: true });
