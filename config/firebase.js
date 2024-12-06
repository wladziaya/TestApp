import { initializeApp } from "firebase/app";
import {getFirestore, collection} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_FIREBASE_API_KEY,
  authDomain: "testapp-4d320.firebaseapp.com",
  projectId: "testapp-4d320",
  storageBucket: "testapp-4d320.firebasestorage.app",
  messagingSenderId: "546847045044",
  appId: "1:546847045044:web:fb50bde0fed1cc3833eee1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const usersRef = collection(db, 'users')

export default app;
