<template>
<div>
  The purpose of this is to understand firestore but I also came across how to use authentication in another way and also having multiple firebase services in a project(HelloWorld1 and firebase1.js).
  <!-- NB. The HelloWorld1 is a not registered component, but I tried out the method used in the HelloWorld.vue and firebase.js which worked, so I copied the code -->
</div>

<div>

  <form @submit.prevent ="addBookForm" class="add">
    <label for="title">Title:</label>
    <input type="text" name="title" v-model="title" required>
    <label for="author">Author:</label>
    <input type="text" name="author" v-model="author" required>

    <button type="submit">Add a new book</button>
  </form>

  <form @submit.prevent ="deleteBookForm" class="delete">
    <label for="id">Document id:</label>
    <input type="text" name="id" v-model="id" required>

    <button type="submit">Delete a book</button>
  </form>

  <form @submit.prevent ="updateBookForm" class="delete">
    <label for="id">Document id:</label>
    <input type="text" name="id" v-model="updateId" required>

    <button type="submit">Update a book</button>
  </form>

        <!-- auth -->
  <form @submit.prevent="authSignIn">
    <label>Email:</label>
    <input type="text" v-model="email" required>

    <label>Password:</label>
    <input type="text" v-model="password" required>

    <button type="submit">Sign In</button>
  </form>

  <button @click="logout">Log Out</button>
</div>
</template>

<script>
import { ref } from 'vue';
import db from '../firebase/firebase'

import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
//The getAuth here, I purposely did not put it in the firebase file. Reference firebase1.js and HelloWorld1.vue as an alternative way.


import { collection, getDocs, addDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp, getDoc, onSnapshot, updateDoc } from 'firebase/firestore/lite';  



 
export default {
  name: 'HelloWorld',

  setup(){
    const title = ref('')
    const author = ref('')
    const id = ref('')
    const updateId = ref('')

      //auth
    const email = ref('')
    const password = ref('')

    const dataBase = db
    // console.log(dataBase)

    const docRef = doc(dataBase, 'books', 'Zr9hizVKpYW9JGvcQbsq') //we want to get the particular book in the data here, using it id

    const collectionRef = collection(dataBase, "books")
    // console.log(title.value, author.value, id.value)





    function authSignIn(){
      const auth = getAuth();
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
      const auth = getAuth();

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
    

          //updating documents
                  //11

    function updateBookForm() {
      // Assuming updateId.value contains the ID of the book document you want to update

      const docRef = doc(collectionRef, updateId.value);
      // const docRef = doc(dataBase, 'books', updateId.value)  //This one too works
      updateDoc(docRef, {
        title: title.value,
        author: author.value,
      })
      .then(() => {
        console.log("Updated");
      })
      .catch((error) => {
        console.error("Error updating document:", error);
      });
    }

    // NB for the third parameter for the doc method which is always an id, for the pur pose of the example here, we are getting the id for the update and delete(2) manually from the firstore into the input on the frontend. You already know how to get id for real time work(the way a developer should get id)



    // getting a single document
    //     10
    // this is similar to 9 but onSnapshot is not just working. So in this code what we want to do is to listen to any change in the document, that is, in that very data


    // onSnapshot(docRef, (doc)=>{
    //   console.log(doc.data(), doc.id)
    // })



    //get a single document, that is getting a single data. This approach is similar to that of the delete()
             //9
    getDoc(docRef)
    .then(doc =>{
      console.log(doc.data(), doc.id)// the data() is object, that is our data come out in form of an object. 
    })
    



        //time-stamp
              // 8

    const q = query(collectionRef, orderBy('createdAt')) //sorting the data by the time the form was created. The time-stamp is in ascending order by default. This 8 goes along with 7 to understand time-stamp

    //getting data
    getDocs(q)
    .then((snapshot)=>{
      console.log(snapshot)
      let books = []
      snapshot.docs.forEach(doc =>{
        books.push({...doc.data(), id: doc.id})
      })
      console.log(books)
    })
    .catch(err=>{
      console.log(err.message)
    })


    //   // 6
    // //query

    // const q = query(collectionRef, where('author', '==', 'Oluwasegun'), orderBy('title', 'desc')) //sorting the data that has Oluwasegun as the author in descending order

    // //getting data
    // getDocs(q)
    // .then((snapshot)=>{
    //   console.log(snapshot)
    //   let books = []
    //   snapshot.docs.forEach(doc =>{
    //     books.push({...doc.data(), id: doc.id})
    //   })
    //   console.log(books)
    // })
    // .catch(err=>{
    //   console.log(err.message)
    // })


    //   // 5
    // //query

    // const q = query(collectionRef, where('author', '==', 'Oluwasegun')) //the query method comes along with where method, the query only help to get data(books) whose author name is Oluwasegun. Even when you add a new book with a different author name, it won't be added, except  the author name is oluwasegun

    // //getting data
    // getDocs(q)
    // .then((snapshot)=>{
    //   console.log(snapshot)
    //   let books = []
    //   snapshot.docs.forEach(doc =>{
    //     books.push({...doc.data(), id: doc.id})  //the data() is a object,so we spread the object into another object, and then adding doc.id from the firestore to the new object.
    //   })
    //   console.log(books)
    // })
    // .catch(err=>{
    //   console.log(err.message)
    // })    //I commented the code below to use this code because of the query method.



        // 3
    // getDocs(collectionRef)
    // .then((snapshot)=>{
    //   console.log(snapshot)
    //   let books = []
    //   snapshot.docs.forEach(doc =>{
    //     books.push({...doc.data(), id: doc.id})
    //   })
    //   console.log(books)
    // })
    // .catch(err=>{
    //   console.log(err.message)
    // })



        // 4
      //real-time collection data, i.e, real time event listener

    // onSnapshot(collectionRef, (snapshot)=>{
    //   console.log(snapshot)
    //   let books = []
    //   snapshot.docs.forEach(doc =>{
    //     books.push({...doc.data(), id: doc.id})
    //   })
    //   console.log(books)
    // })   //This is what we should be using instead of the getDoc, but snapshot method is not working and i don't know why. Though they work same way but the difference is that this does not require us reloading our browser whenever there is any changes, whether adding a bookor deleting.



      // 7
    //adding data
    function addBookForm(){
      addDoc(collectionRef, {title: title.value,
        author: author.value,
        id: id.value,
        createdAt: serverTimestamp()
        //the createdAt wasn't in the object property or in the form the user is filling, what we want to achieve here in this example here is including our data to have a time-stamp,i.e, time at which each form or data was created. For the time-stamp, we can actually use the javascript date method, but we are making use of the firebase own. So this 8 goes along with 7 to understand time-stamp
      })
      .then(()=>{
        // addBookForm.reset()
      })
    }

    //   // 1
    // //adding data
    // function addBookForm(){
    //   addDoc(collectionRef, {title: title.value, author: author.value, id: id.value} )
    //   .then(()=>{
    //     // addBookForm.reset()
    //   })
    // }

      // 2
    //deleting data
    function deleteBookForm(){
      const docRef = doc(dataBase, 'books', id.value) //the doc function means a single data. The doc accept 3 parameters, the database, the collection and it id
      deleteDoc(docRef)
      .then(()=>{
        console.log("Deleted")
      })
    }

    return{
      title,
      author,
      id,
      addBookForm,
      deleteBookForm,
      updateId,
      updateBookForm,
      email,
      password,
      authSignIn,
      logout
    }
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
