import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5bcC1pdwEgBmzRbffMiuDcYTZ3X46wMU",
  authDomain: "reactfirebase-9667b.firebaseapp.com",
  projectId: "reactfirebase-9667b",
  storageBucket: "reactfirebase-9667b.appspot.com",
  messagingSenderId: "598943023225",
  appId: "1:598943023225:web:c0226e8dc811303ae814a8",
  measurementId: "G-XC4WJ1H3GT"
};

  export default firebase.initializeApp(firebaseConfig);