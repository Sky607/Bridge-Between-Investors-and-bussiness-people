import { auth, db } from './firebase_config.js';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { 
  doc, setDoc, getDoc 
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

// Handle Registration
document.getElementById('register-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;
  const fname = document.getElementById('fname').value;
  const lname = document.getElementById('lname').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;
    console.log(userCredential,userId,db)
    // Save user details in Firestore
    let ref=doc(db,"users",userId);
    await setDoc(ref, {
      fname,
      lname,
      email,
      role,
    });

    alert('Registration successful!');
    window.location.href = 'login.html';
  } catch (error) {
    console.error("Registration Error:", error);
    alert(`Error: ${error.message}`);
  }
});

// Handle Login
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    const userId =userCredential.user.uid
   
    if(userCredential) localStorage.setItem('user',userId);
    // Fetch user role from Firestore
    const userDoc = await getDoc(doc(db, 'users', userId));

    if (userDoc.exists()) {
      const userRole = userDoc.data().role;
    
      // Redirect based on role
      switch (userRole) {
        case 'business_person':
          window.location.href = '../modules/business.html';
          break;
        case 'investor':
          window.location.href = '../modules/investor.html';
          break;
        case 'banker':
          window.location.href = '../modules/banker.html';
          break;
        case 'advisor':
          window.location.href = '../modules/advisor.html';
          break;
        default:
          alert('Unknown role');
      }
    } else {
      alert('User role not found!');
    }
  } catch (error) {
    console.error("Login Error:", error);
    alert(`Error: ${error.message}`);
  }
});
