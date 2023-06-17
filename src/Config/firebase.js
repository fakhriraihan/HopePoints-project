import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBX2WgxaW5l6gaEM6NZe-dyUBTXxxTym9Y",
  authDomain: "hopepoints-project.firebaseapp.com",
  projectId: "hopepoints-project",
  storageBucket: "hopepoints-project.appspot.com",
  messagingSenderId: "646396885422",
  appId: "1:646396885422:web:e0c3da9dbe3388933a703f",
  measurementId: "G-LVHY0G08D4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);