// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7hFCzwsBTTdHIPgqodS3wGwtGQp6xZQc",
  authDomain: "rami-f6ca5.firebaseapp.com",
  projectId: "rami-f6ca5",
  storageBucket: "rami-f6ca5.firebasestorage.app",
  messagingSenderId: "138844303929",
  appId: "1:138844303929:web:5b6bfc6a262776594d13e8",
  measurementId: "G-MT0LC4TNFR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firestore instance
const db = getFirestore(app);

export { app, analytics, db };
