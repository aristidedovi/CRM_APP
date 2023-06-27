// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeDzU67ut0cFk3DWdVdNEo9znXdkB5r-M",
  authDomain: "yuupee-app-auth.firebaseapp.com",
  projectId: "yuupee-app-auth",
  storageBucket: "yuupee-app-auth.appspot.com",
  messagingSenderId: "422338029153",
  appId: "1:422338029153:web:d30a1423ede139611aec20"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export default firebase;


// Initialize Firebase Authentication and get a reference to the service
// export const auth = getAuth(app);
// export default app;