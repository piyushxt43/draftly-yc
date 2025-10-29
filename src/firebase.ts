import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQTD9SHIJ9BMnauJ2cJevIVxYxtuWJJaY",
  authDomain: "draflty.firebaseapp.com",
  projectId: "draflty",
  storageBucket: "draflty.firebasestorage.app",
  messagingSenderId: "999469134861",
  appId: "1:999469134861:web:207bd3ee83fee13bd6d144",
  measurementId: "G-P6S60N1JV1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, doc, setDoc, getDoc };

