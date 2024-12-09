import { auth, db } from '../../firebase_config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { 
  collection,addDoc,serverTimestamp,getDoc,doc
} from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
// Logout Functionality

onAuthStateChanged(auth, (user) => {
  if (user && localStorage.getItem('user')) {
  } else {
    window.location.href = '../pages/login.html';
  }
});
document.getElementById('logout-button')?.addEventListener('click', async () => {
  await auth.signOut();
  localStorage.clear()
  alert('Logged out successfully!');
  window.location.href = '../pages/login.html';
  
});
let role;
async function RoleCheck(user){
  const userDocRef = doc(db, "users", user);
  try {
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
     const  role=userDoc.data().role
    return role
    } else {
      console.log("No user data available for this userId");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
}
// Post Loan Details
document.getElementById('loan-details-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const loanTitle = document.getElementById('loan-title').value;
  const loanDescription = document.getElementById('loan-description').value;
  const interestRate = parseFloat(document.getElementById('interest-rate').value);

  role=await RoleCheck(localStorage.getItem('user'))
  console.log('role',role)
  if(role==='banker'){
  try {
    const userId = localStorage.getItem('user')
    const userLoanRef=collection(db,'loanProposals')
    await addDoc(userLoanRef,{
      userId,
      loanTitle,
      loanDescription,
      interestRate,
      timestamp: serverTimestamp(),
    });

    alert('Loan details posted successfully!');
    document.getElementById('loan-details-form').reset();
  } catch (error) {
    console.error(error);
    alert(`Error: ${error.message}`);
  }}
  else{
    localStorage.clear();
    alert('you are not allowed to submit please login as banker')
    window.location.href = '../pages/login.html';
   }
});
