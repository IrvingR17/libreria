import firebase from 'firebase/app'
import "firebase/firestore"

var firebaseConfig = {
  apiKey: "AIzaSyDtI85GgSiU2pPZyrQPJftacwFHSiaQTY8",
  authDomain: "libreria-18e07.firebaseapp.com",
  projectId: "libreria-18e07",
  storageBucket: "libreria-18e07.appspot.com",
  messagingSenderId: "1079826677375",
  appId: "1:1079826677375:web:d21e60eaf545b9e8ce894a"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const db = firebase.firestore()