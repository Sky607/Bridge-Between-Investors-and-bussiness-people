  import { auth, db } from '../../firebase_config.js';
  import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
  import { 
    collection,addDoc,serverTimestamp,doc,getDoc
  } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
  // Logout Functionality
 console.log(auth.user)
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
  // Post Business Idea
  document.getElementById('business-idea-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const ideaTitle = document.getElementById('title').value
    const ideaDescription = document.getElementById('description').value
    const BusinessCategories=document.getElementById('category').value
    role=await RoleCheck(localStorage.getItem('user'))
    console.log('role',role)
    if(role==='business_person'){
    try {
      const userId =localStorage.getItem('user')
      const userIdeasRef = collection(db, "businessIdeas"); 

      await addDoc(userIdeasRef, {
        userId, 
        ideaTitle,
        ideaDescription,
        BusinessCategories,
        timestamp: serverTimestamp(), 
      });

      alert('Idea posted successfully!');
      document.getElementById('business-idea-form').reset();
    } catch (error) {
      alert(`Error: ${error.message}`);
    }}
    else{
      localStorage.clear();
      alert('you are not allowed to submit please login as business_person')
      window.location.href = '../pages/login.html';
     }
  });
  

