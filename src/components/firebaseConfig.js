// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { get, getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7MUjw6NXr03TFEnM6piOCR6XkNiR2zgE",
  authDomain: "chatme-a212d.firebaseapp.com",
  databaseURL: "https://chatme-a212d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chatme-a212d",
  storageBucket: "chatme-a212d.appspot.com",
  messagingSenderId: "372182820267",
  appId: "1:372182820267:web:1c2acadb713296496edeee",
  measurementId: "G-WCBQ7SDVH0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
