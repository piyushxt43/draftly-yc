import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, enableIndexedDbPersistence, collection, addDoc, query, orderBy, limit, getDocs } from "firebase/firestore";

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

// Enable offline persistence (prevents error spam)
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('⚠️ Multiple tabs open, persistence can only be enabled in one tab at a time.');
  } else if (err.code === 'unimplemented') {
    console.warn('⚠️ Browser doesn\'t support offline persistence.');
  } else {
    // Silently ignore other persistence errors (network issues, etc.)
    console.debug('Firestore persistence setup skipped:', err.code);
  }
});

// Check Firebase configuration
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  console.error('❌ Firebase configuration missing! Check environment variables in Vercel.');
}

export { auth, db, googleProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, doc, setDoc, getDoc, collection, addDoc, query, orderBy, limit, getDocs };

