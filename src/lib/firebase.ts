// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwAYbrAbnBKUFrtUDUpa45rmFrSw1IpBI",
  authDomain: "boardgamersparadise.firebaseapp.com",
  projectId: "boardgamersparadise",
  storageBucket: "boardgamersparadise.appspot.com",
  messagingSenderId: "1089265879000",
  appId: "1:1089265879000:web:3a4cf45df8fbfe0262d4ad",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
