// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWI_5XzWcm7vw551uCNPl7Wi0TVUumfdA",
  authDomain: "my-academic-archive.firebaseapp.com",
  projectId: "my-academic-archive",
  storageBucket: "my-academic-archive.appspot.com",
  messagingSenderId: "412793168529",
  appId: "1:412793168529:web:8a7f75dbd423677614d530"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app; 