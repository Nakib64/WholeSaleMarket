// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7lmuuRkK-fDc6r9S02PcRWq2EXn6n_Xg",
  authDomain: "wholesale-11b32.firebaseapp.com",
  projectId: "wholesale-11b32",
  storageBucket: "wholesale-11b32.firebasestorage.app",
  messagingSenderId: "172385892338",
  appId: "1:172385892338:web:e167a781f36de4ded95d6b",
  measurementId: "G-14MNL4D8ES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)