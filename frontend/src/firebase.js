// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your Firebase configuration (replace with your Firebase project config)
const firebaseConfig = {
  apiKey: "AIzaSyATvbyy7CeAjzrsiw7P-Ts0W3Xkhj-rmog",
  authDomain: "coloui-1ca0b.firebaseapp.com",
  projectId: "coloui-1ca0b",
  storageBucket: "coloui-1ca0b.appspot.com",
  messagingSenderId: "199385208984",
  appId: "1:199385208984:web:9e700e1cbb0cd8a83d58ed",
  measurementId: "G-0HDZS234YC",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };