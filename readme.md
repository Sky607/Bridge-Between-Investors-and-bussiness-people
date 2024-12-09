# Bridge Between Investors and Business People

## Overview
This web application serves as a platform to connect **Business People**, **Investors**, **Bankers**, and **Business Advisors**. Users can register under their respective roles and interact with the platform's functionalities tailored to their needs.

## Key Features
### 1. **Role-Based Access**
   - **Business People**: Post business ideas and view business categories.
   - **Investors**: View business proposals, post investor proposals, and explore categories.
   - **Bankers**: Post loan details and respond to queries.
   - **Business Advisors**: Provide solutions, view queries, and post information.

### 2. **Authentication**
   - Secure registration and login system using Firebase Authentication.

### 3. **Real-Time Database**
   - Firebase Firestore for storing user profiles, proposals, and other dynamic content.

### 4. **Dynamic Content Posting**
   - Users can create, view, and interact with various types of posts specific to their roles.

### 5. **Category Filtering**
   - Proposals and ideas are categorized for easy navigation and filtering.

### 6. **Responsive Design**
   - Mobile-friendly interface with a consistent and user-friendly layout.

---

## Technology Stack

### **Frontend**
- **HTML5**: Structuring the application.
- **CSS3**: Styling and responsive design.
- **JavaScript (ES6)**: Client-side interactivity.

### **Backend**
- **Firebase Authentication**: User authentication and authorization.
- **Firebase Firestore**: Real-time NoSQL database.

---

## File Structure

```
project-directory/
├── index.html            # Landing Page
├── modules/              # Role-specific pages
│   ├── business.html
│   ├── investor.html
│   ├── banker.html
│   ├── advisor.html
|   ├── index.html     

├── styles/               # Stylesheets
│   ├── main.css
│   ├── business.css
│   ├── investor.css
│   ├── banker.css
│   ├── advisor.css
│   ├── register.css
│   ├── login.css

├── scripts/              # JavaScript files
│   ├── business.js
│   ├── investor.js
│   ├── banker.js
│   ├── advisor.js
│   ├── register.js
│   ├── login.js
├── assets/               # Images and other static resources
├── README.md     
├── firebase_config.js
├── app.js    

      # Project documentation
```

---

## How to Run the Project

### 1. Clone the Repository
```bash
git clone https://github.com/Sky607/Bridge-Between-Investors-and-bussiness-people.git
```

### 2. Set Up Firebase
- Create a Firebase project on [Firebase Console](https://console.firebase.google.com/).
- Enable Authentication (Email/Password).
- Set up a Firestore database.
- Copy your Firebase configuration and replace it in `firebase_config.js`:

```javascript
const firebaseConfig = {
  apiKey: "<YOUR_API_KEY>",
  authDomain: "<YOUR_AUTH_DOMAIN>",
  projectId: "<YOUR_PROJECT_ID>",
  storageBucket: "<YOUR_STORAGE_BUCKET>",
  messagingSenderId: "<YOUR_MESSAGING_SENDER_ID>",
  appId: "<YOUR_APP_ID>"
};
```

### 3. Launch the Application
- Use any local HTTP server to run the project, such as VS Code Live Server or Python SimpleHTTPServer:

**With Python:**
```bash
python3 -m http.server
```
**With VS Code:**
- Right-click on `index.html` and select "Open with Live Server".

### 4. Open in Browser
Navigate to `http://localhost:8000` (or the address provided by your server).

---

## Features by Role

### **Business People**
- Register and login.
- Post business ideas with title, description, and category.
- View business categories.

### **Investors**
- Register and login.
- View business proposals.
- Post investor proposals.

### **Bankers**
- Register and login.
- Post loan details.
- View and respond to queries.

### **Business Advisors**
- Register and login.
- View and respond to queries.
- Post solutions and information.

---

## Known Issues and Future Enhancements
### Current Issues
- CORS errors during API calls may occur if the Firebase configuration is incorrect.
- Styling inconsistencies on older browsers.

### Future Enhancements
- Add email verification for user registration.
- Implement role-based dashboards for personalized experiences.
- Improve proposal filtering with advanced search.

---

## Contributors
- **Shashi Kumar Yadav**  
  [GitHub](https://github.com/sky607) | [LinkedIn](https://linkedin.com/in/yadavshashi)

---


