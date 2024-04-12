// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCSY4TwxAz_p0iMWffDgqs4HjIfsn7r620",
  authDomain: "pokessist-642ff.firebaseapp.com",
  projectId: "pokessist-642ff",
  storageBucket: "pokessist-642ff.appspot.com",
  messagingSenderId: "338198686378",
  appId: "1:338198686378:web:5dfa8f1e9572babe0d7ed3",
  measurementId: "G-P4GHG104TR",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
