import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Replace with your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCj-dDLfJpkHWYRIaCUjuN-oS1UL5B1iQE",
  authDomain: "pharmaland-app-v1.firebaseapp.com",
  projectId: "pharmaland-app-v1",
  storageBucket: "pharmaland-app-v1.firebasestorage.app",
  messagingSenderId: "952926891344",
  appId: "1:952926891344:web:ed1aa3cdc24d4f3da81055"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };
