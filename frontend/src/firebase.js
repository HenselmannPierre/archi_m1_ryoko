import { useEffect, useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
      
// The web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuZNuP7Unb5FHqnPXSFwYCin4CzDh6t38",
  authDomain: "ryoko-b304b.firebaseapp.com",
  projectId: "ryoko-b304b",
  storageBucket: "ryoko-b304b.appspot.com",
  messagingSenderId: "390068753335",
  appId: "1:390068753335:web:ad92a8833c873f3f920e32"
}

// Initialize Firebase
/*const app = */initializeApp( firebaseConfig )
const auth = getAuth()

export function signup( email, password ) {
  return createUserWithEmailAndPassword( auth, email, password )
}

export function login( email, password ) {
  return signInWithEmailAndPassword( auth, email, password )
}

export function logout() {
  return signOut(auth);
}

// Custom Hook
export function useAuth() {
  const [ currentUser, setCurrentUser ] = useState();

  useEffect(
    () => {
        const unsub = onAuthStateChanged( auth, user => setCurrentUser( user ) )
        return unsub;
    },
    []
  )

  return currentUser;
}