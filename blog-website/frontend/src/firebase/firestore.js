// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANWEIeP5bYzN6ccAZkETLCdJzr2GKWWRM",
  authDomain: "blog-mern-403d8.firebaseapp.com",
  projectId: "blog-mern-403d8",
  storageBucket: "blog-mern-403d8.appspot.com",
  messagingSenderId: "497760557999",
  appId: "1:497760557999:web:c3aeeab14671bc508d2d5a",
  measurementId: "G-DLP9ZJV7XQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
