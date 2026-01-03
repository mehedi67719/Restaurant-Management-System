// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/cordova";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4QZfP8op1o3eLPzh3k-FoajuDIlG3JRo",
  authDomain: "restaurant-management-sy-967e8.firebaseapp.com",
  projectId: "restaurant-management-sy-967e8",
  storageBucket: "restaurant-management-sy-967e8.firebasestorage.app",
  messagingSenderId: "171559459190",
  appId: "1:171559459190:web:99600fb5560fdb36a68257"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);