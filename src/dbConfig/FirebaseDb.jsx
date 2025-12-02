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
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);

// src/firebase.js
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyBVUXqDUyYllwFW-HEwr1SG5v6_JY__c-I",
//   appId: "1:200919589550:web:7eaca979f0e1e329cb033f",
//   messagingSenderId: "200919589550",
//   projectId: "rooks-serviceapp",
//   authDomain: "rooks-serviceapp.firebaseapp.com",
//   storageBucket: "rooks-serviceapp.firebasestorage.app",
//   measurementId: "G-VHJ8HWY1EZ",
// };

// export const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
