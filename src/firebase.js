import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDHkWLw0VdiT0t4h3-EfMEp0-d9n06uHVU",
    authDomain: "mybooks-328e4.firebaseapp.com",
    projectId: "mybooks-328e4",
    storageBucket: "mybooks-328e4.firebasestorage.app",
    messagingSenderId: "938917303902",
    appId: "1:938917303902:web:f96194896b2e7f51fc06cf"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
