import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export var firebaseConfig = {
  apiKey: "AIzaSyD7Zxjjzqnc7-BvZ7xLLjR2KqStBEmmDVg",
  authDomain: "note-tester.firebaseapp.com",
  projectId: "note-tester",
  storageBucket: "note-tester.appspot.com",
  messagingSenderId: "931987042071",
  appId: "1:931987042071:web:1cb638d8a90bf9730cd152",
  measurementId: "G-E14SD7N17Y",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = firebase.auth();
firebase.analytics();
