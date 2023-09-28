// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { ref } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyC5R7yWpiKd7BRILtOhZr3NbVbPZLfCzNY",
  authDomain: "restaurant-app-e5597.firebaseapp.com",
  projectId: "restaurant-app-e5597",
  storageBucket: "restaurant-app-e5597.appspot.com",
  messagingSenderId: "112579582009",
  appId: "1:112579582009:web:492ec7be3a60d4211b15e8",
  measurementId: "G-Y4FY5D8R7F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const storageRef = ref(storage);