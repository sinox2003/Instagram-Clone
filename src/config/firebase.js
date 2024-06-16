// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNigg7_TBNMftH68vNZwekaMgnGRFWils",
  authDomain: "instaclone-2bf02.firebaseapp.com",
  projectId: "instaclone-2bf02",
  storageBucket: "instaclone-2bf02.appspot.com",
  messagingSenderId: "330408501521",
  appId: "1:330408501521:web:85e33056735fa48f1d6cb0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const realtimeDatabase = getDatabase(app);
