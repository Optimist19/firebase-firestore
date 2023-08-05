// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from 'firebase/firestore/lite';		//You import this

import { getAuth } from "firebase/auth";		//You import this

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

const auth = getAuth(app)

export {db, auth};

//we can't use export default since since we are using multiple firebase in our app, so we put all services in a variable and export them(named export) to their various component we want to use them.



