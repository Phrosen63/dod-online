import { firebaseApp } from './fb';
import 'firebase/firestore';

// Export firestore
export const db = firebaseApp.firestore();

// const { Timestamp, GeoPoint } = firebaseApp.firestore;
// export { Timestamp, GeoPoint }

db.settings({ timestampsInSnapshots: true });
