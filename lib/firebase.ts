import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAyIdpUzCrgwT6xd2JeI_ueQZCscwa50xs",
  authDomain: "bolt-001.firebaseapp.com",
  projectId: "bolt-001",
  storageBucket: "bolt-001.appspot.com",
  messagingSenderId: "524504006911",
  appId: "1:524504006911:web:9f3b78d89c357ee20dccca",
  measurementId: "G-8Q6P65651G"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };

