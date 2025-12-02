import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBVUXqDUyYllwFW-HEwr1SG5v6_JY__c-I",
  appId: "1:200919589550:web:7eaca979f0e1e329cb033f",
  messagingSenderId: "200919589550",
  projectId: "rooks-serviceapp",
  authDomain: "rooks-serviceapp.firebaseapp.com",
  storageBucket: "rooks-serviceapp.firebasestorage.app",
  measurementId: "G-VHJ8HWY1EZ",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);
