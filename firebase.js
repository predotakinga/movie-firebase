// Import the functions you need from the SDKs you need
import * as firebase from "firebase";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGLA_fvsylSMlbNpzHimG0WfWM-OiMQrw",
  authDomain: "fir-auth-feb5c.firebaseapp.com",
  projectId: "fir-auth-feb5c",
  storageBucket: "fir-auth-feb5c.appspot.com",
  messagingSenderId: "251778868139",
  appId: "1:251778868139:web:db6db376713e2cb3fd28ee",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
