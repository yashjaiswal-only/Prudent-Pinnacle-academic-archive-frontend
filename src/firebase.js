import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCMs6-eF3R1JrlE8x_UzRnofexeqC6y62o",
  authDomain: "academic-archive.firebaseapp.com",
  projectId: "academic-archive",
  storageBucket: "academic-archive.appspot.com",
  messagingSenderId: "774781616737",
  appId: "1:774781616737:web:365c88aebc1802f00aa020",
  measurementId: "G-D22WE9VH09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app; 