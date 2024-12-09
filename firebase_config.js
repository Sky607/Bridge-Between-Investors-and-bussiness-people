// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAsDj-z7TUw_Q06rnVzsS33OYBpr0Nw8qQ",
  authDomain: "investor-and-business-pe-ad51e.firebaseapp.com",
  databaseURL: "https://investor-and-business-pe-ad51e-default-rtdb.firebaseio.com",
  projectId: "investor-and-business-pe-ad51e",
  storageBucket: "investor-and-business-pe-ad51e.firebasestorage.app",
  messagingSenderId: "391375401687",
  appId: "1:391375401687:web:b4a885f742e5c4fb727692",
  measurementId: "G-32WED1QC7P"
};
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  export { auth, db };
  