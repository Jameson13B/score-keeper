import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig);

// Database instance
export const db = Firebase.firestore();
export const serverTimestamp = () =>
  firebase.firestore.FieldValue.serverTimestamp();
export const addArray = item => firebase.firestore.FieldValue.arrayUnion(item);
export const removeArray = item => firebase.firestore.FieldValue.arrayRemove(item);
