// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjdXXGgWleJ-Rd3kpanY7xGssc5A5YIU0",
  authDomain: "hack-the-change-2024.firebaseapp.com",
  projectId: "hack-the-change-2024",
  storageBucket: "hack-the-change-2024.firebasestorage.app",
  messagingSenderId: "999762466975",
  appId: "1:999762466975:web:c7a6d2b048dd26b27b2aaa",
  measurementId: "G-0MWCTJ6HYZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
