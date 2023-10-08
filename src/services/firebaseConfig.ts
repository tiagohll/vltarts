// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxksv5mgnbx__XhAOfq6zeR5r8TCvqQ48",
  authDomain: "design-6a54f.firebaseapp.com",
  databaseURL: "https://design-6a54f-default-rtdb.firebaseio.com",
  projectId: "design-6a54f",
  storageBucket: "design-6a54f.appspot.com",
  messagingSenderId: "431898626377",
  appId: "1:431898626377:web:16bc0bf38076b0365cf298",
  measurementId: "G-QYP7P68122"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firebase Database and get a reference to the service
export const database = getDatabase(app);