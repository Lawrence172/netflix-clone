// Firebase SDK imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAIzO2fye8VIxnJOi2qEevo0_CwI7U5FVE",
    authDomain: "netflix-clone-12305.firebaseapp.com",
    projectId: "netflix-clone-12305",
    storageBucket: "netflix-clone-12305.firebasestorage.app",
    messagingSenderId: "916211649044",
    appId: "1:916211649044:web:b495d5fff97bdb9ed63501",
    measurementId: "G-PSWYYYEB1L"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
