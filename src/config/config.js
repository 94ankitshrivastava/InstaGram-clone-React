 import firebase from 'firebase';

 const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC8J987UgXJGoGAklAKQcEp9nQSMJ0vTRA",
    authDomain: "instagram-clone-eaf09.firebaseapp.com",
    databaseURL: "https://instagram-clone-eaf09.firebaseio.com",
    projectId: "instagram-clone-eaf09",
    storageBucket: "instagram-clone-eaf09.appspot.com",
    messagingSenderId: "856090859364",
    appId: "1:856090859364:web:41ba8fe3c02a0dfc5b4c71",
    measurementId: "G-BVDDJDBCDB"
 });


 const db= firebaseApp.firestore();
 const auth =  firebase.auth();
 const storage = firebase.storage();

 export { db, auth, storage }