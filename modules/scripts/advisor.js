import { auth, db } from '../../firebase_config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
import { 
  collection,addDoc,getDocs,serverTimestamp,getDoc,doc
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

//to get user name

const getUserDetails = async (userId) => {
  const userDocRef = doc(db, "users", userId);
  try {
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
    return userDoc.data()
    } else {
      console.log("No user data available for this userId");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

// Load Queries
const loadQueries = async () => {
  const queryList = document.getElementById('query-list');
  const queryDropdown = document.getElementById('query-id');

  try {
    const querySnapshot = await getDocs(collection(db,'businessIdeas'));
    
    querySnapshot.forEach(async (doc) => {
      const data = doc.data();
      const name=await getUserDetails(data.userId)
    

      const listItem = document.createElement('li');
      listItem.className="query-li"
      listItem.textContent = `Question: ${data.ideaDescription} (By User: ${name.fname} )`;
      queryList.appendChild(listItem);


      const option = document.createElement('option');
      option.value = `${data.ideaTitle} by ${name.fname}`;
      option.textContent = option.value;
      queryDropdown.appendChild(option);
    });
  } catch (error) {
    console.error(error);
    alert(`Load queries Error: ${error.message}`);
  }
};
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


// Post Solution
document.getElementById('solution-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const queryId = document.getElementById('query-id').value;
  const solutionText = document.getElementById('solution-text').value;
role=await RoleCheck(localStorage.getItem('user'))

if(role==='advisor'){
  try {
    const advisorId=localStorage.getItem('user')
    const userSolutionRef=collection(db,'solutions')
    await addDoc(userSolutionRef,{
      queryId,
      solutionText,
      advisorId,
      timestamp: serverTimestamp(),
    });

    alert('Solution posted successfully!');
    document.getElementById('solution-form').reset();
    loadQueries(); // Reload queries
  } catch (error) {
    console.error(error);
    alert(` form Error: ${error.message}`);
  }}
 else{
  localStorage.clear();
  alert('you are not allowed to submit please login as advisor')
  window.location.href = '../pages/login.html';
 }
});


// Load queries on page load
window.onload = loadQueries;
