// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBDuxi8DuisqpZaADj_xObmZoXLLW1on9w",
  authDomain: "auth-dev-6152f.firebaseapp.com",
  databaseURL:
    "https://auth-dev-6152f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "auth-dev-6152f",
  storageBucket: "auth-dev-6152f.appspot.com",
  messagingSenderId: "650561251003",
  appId: "1:650561251003:web:295a654a38daea0e1bab9e",
  measurementId: "G-62KPJHVDE7",
};

// export function logout() {
//   return firebaseAuth().signOut();
// }

// export function login(email, pw) {
//   return firebaseAuth().signInWithEmailAndPassword(email, pw);
// }

// export function saveUser(user) {
//   return db
//     .collection(`users`)
//     .add({
//       email: user.email,
//       uid: user.uid,
//     })
//     .then((docRef) => docRef)
//     .catch(function (error) {
//       console.error("Error adding document: ", error);
//     });
// }

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
