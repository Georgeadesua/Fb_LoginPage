const admin = require('firebase-admin');

// Parse the environment variable to get Firebase service account JSON
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://loginpage-4c2c7-default-rtdb.firebaseio.com" // Firebase Realtime Database URL
});

const db = admin.database(); // For Realtime Database
// const db = admin.firestore(); // For Firestore (if you prefer Firestore)

module.exports = db;
