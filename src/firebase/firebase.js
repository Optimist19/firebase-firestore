// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from 'firebase/firestore/lite';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwaKpMhKsfUTNe-H6X39PKvPDdQtQiwpk",
  authDomain: "fir-firestore-e3722.firebaseapp.com",
  projectId: "fir-firestore-e3722",
  storageBucket: "fir-firestore-e3722.appspot.com",
  messagingSenderId: "683301725786",
  appId: "1:683301725786:web:31d34459ff28743b945a63"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// export {db}; This will work also, we are just to import the variable in the HelloWorld.vue. HelloWorld1.vue and firebase1.js is a reference to this example


export default db;  //This also work too,so we are just exporting it as function.

// NB. I didn't import getAuth here for authentication, I only imported it in the component I needed for authentication.




