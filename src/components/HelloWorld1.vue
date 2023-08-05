<template>
  <form @submit.prevent="authSignIn">
    <label>Email:</label>
    <input type="text" v-model="email" required>

    <label>Password:</label>
    <input type="text" v-model="password" required>

    <button type="submit">Sign In</button>
  </form>
  <button @click="logout">Log Out</button>
</template>

<script>
import {db, auth} from '../firebase/firebase1'
//The auth in here has already been exported fom the firebase file and importing to this component as named import and export. So, we do not need "const auth = getAuth();", whatever other authentication we want to do, we will just import them from the firebase/auth, as seen below.

//The db is not being used here because since we are not using firestore and I am not focusing on db here.
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
export default {
	name: 'HelloWorld1',
	setup(){
		function authSignIn(){
			// const auth = getAuth();
			signInWithEmailAndPassword(auth, email.value, password.value)
			.then((userCredential) => {
			// Signed in 
			const user = userCredential.user;
			// ...
			console.log("getting user",user)
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				// ..
			});
    
		}

		function logout(){
			// const auth = getAuth();	

			signOut(auth)
			.then(() => {
			// Sign-out successful.

			// alert("Sign-out successful")
			console.log("Sign-out successful");

			})
			.catch((error) => {
			// An error happened.
			console.log("Sign-out unsuccessful");
			})
		}


		return{
			authSignIn,
			logout,
			email,
			password
		}
	}
}
</script>

<style>

</style>

<!-- All is just to understand alternative way on how to use multiple firebase services in a project if you do not want to use the other approach. You will import the firebase service you want in the firebase file and then put your "app" in each of them and putting them in different variables and then proceed on exporting the variables(Check the firebase1 file). You then import the particular service which is already in a variable into the particular component you want to use it in(just like line 15 of this component).
You also will have to import methods that come along with the particular firebase service you are using that you need from the firebase package and not firebase1 file(just like line 19)-->