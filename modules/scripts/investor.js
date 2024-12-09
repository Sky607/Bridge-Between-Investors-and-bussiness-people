// Import Firebase Configuration
import { auth, db } from '../../firebase_config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
  import { 
    collection,addDoc,getDocs,serverTimestamp,query, where
  } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";
  // Logout Functionality
 
  onAuthStateChanged(auth, (user) => {
    if (user && localStorage.getItem('user')) {
    } else {
      window.location.href = '../pages/login.html';
    }
  });
// Logout Functionality
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


// Post Investment Proposal
document.getElementById('post-proposal-form')?.addEventListener('submit', async (e) => {
e.preventDefault();
role=await RoleCheck(localStorage.getItem('user'))
console.log('role',role)
if(role==='investor'){
  try {
    let proposalTitle = document.getElementById('proposal-title').value
    let proposalAmount = parseFloat(document.getElementById('proposal-amount').value)
    let investmentCategory = document.getElementById('investment-category-option').value
    let proposalDescription = document.getElementById('proposal-description').value
    
    const userId = localStorage.getItem('user')
    const userProposalRef = collection(db, 'investmentProposals'); 

    await addDoc(userProposalRef,{
      userId,
      proposalTitle,
      proposalAmount,
      investmentCategory,
      proposalDescription,
      timestamp:serverTimestamp(),
    });

    alert('Investment proposal submitted successfully!');
    document.getElementById('post-proposal-form').reset();
  } catch (error) {
    console.error(error);
    alert(` add Error: ${error.message}`);
  }}
  else{
    localStorage.clear();
    alert('you are not allowed to submit please login as business_person')
    window.location.href = '../pages/login.html';
   }
});

// Fetch and Display Business Proposals
const loadBusinessProposals = async () => {
  const proposalsList = document.getElementById('view-business-proposals');

  try {
    const userProposalRef=collection(db,"businessIdeas")
    const querySnapshot = await getDocs(userProposalRef);
    
    querySnapshot.forEach((doc) => {
      const { BusinessCategories,ideaDescription,ideaTitle, timestamp } = doc.data();
      const div=document.createElement("div");
      div.className="business-details"

      const heading=document.createElement("h2");
      heading.className="heading"
      heading.textContent=`Title : ${ideaTitle}`
    
      const para = document.createElement('p');
      para.className="desc"
      para.textContent =  `Description : ${ideaDescription}`;

      const category = document.createElement('p');
      category.className="category"
      category.textContent =  `BusinessCategories : ${BusinessCategories}`;
      
      const newTime=timestamp.toDate()
      const time = document.createElement('p');
      time.className="time"
      time.textContent =  `Posted time : ${newTime.toISOString().split('T')[0]}`;

     div.appendChild(heading)
     div.appendChild(para);
     div.appendChild(category)
     div.appendChild(time)     
     proposalsList.appendChild(div)

    });
  } catch (error) {
    console.error(error);
    alert(`load business Error: ${error.message}`);
  }
};

// Fetch Investment Categories
const loadInvestmentCategories = async () => {
  const categoriesDropdown = document.getElementById('investment-category-option');

  try {
    const querySnapshot = await getDocs(collection(db,'businessIdeas'));
    querySnapshot.forEach((doc) => {
      const category = doc.data().ideaTitle;
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoriesDropdown.appendChild(option);
    });
  } catch (error) {
    console.error(error);
    alert(`load investment Error: ${error.message}`);
  }
 
};



// Load business proposals and investment categories on page load
window.onload = () => {
  loadBusinessProposals();
  loadInvestmentCategories();
};
