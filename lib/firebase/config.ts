import { initializeApp, getApps, FirebaseOptions } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAyIdpUzCrgwT6xd2JeI_ueQZCscwa50xs",
  authDomain: "bolt-001.firebaseapp.com",
  projectId: "bolt-001",
  storageBucket: "bolt-001.firebasestorage.app",
  messagingSenderId: "524504006911",
  appId: "1:524504006911:web:9f3b78d89c357ee20dccca",
  measurementId: "G-8Q6P65651G"
};

// Initialize Firebase
let app;
let auth;
let db;
let storage;

try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} catch (error) {
  console.error("Error initializing Firebase:", error);
  // You might want to set a flag or state to indicate that Firebase failed to initialize
}

export { app, auth, db, storage };

