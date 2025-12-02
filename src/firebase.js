import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD2tCdMsXrwPS9PDBIU9Lz86Kdr530JVU0",
  authDomain: "dashboard-7ef61.firebaseapp.com",
  projectId: "dashboard-7ef61",
  storageBucket: "dashboard-7ef61.firebasestorage.app",
  messagingSenderId: "720491123414",
  appId: "1:720491123414:web:a9efcf42f23456a700ef77",
  measurementId: "G-98JWB7X0GB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
