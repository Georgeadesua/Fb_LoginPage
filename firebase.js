// /firebase/firebase.js
import * as admin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);  // Ensure the service account JSON is in .env

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://loginpage-4c2c7-default-rtdb.firebaseio.com",  // Realtime Database URL
});

const db = admin.firestore();  // Use Firestore instead of Realtime DB

export { db, admin };
