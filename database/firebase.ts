import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDmAKh5cLfPswJzNezYbruRzUafh3LXNow",
    authDomain: "gabarita-linguagens.firebaseapp.com",
    projectId: "gabarita-linguagens",
    storageBucket: "gabarita-linguagens.appspot.com",
    messagingSenderId: "327020774973",
    appId: "1:327020774973:web:b0f0b1dc08836dd0f8cc54",
    measurementId: "G-RLY3NXF0E1"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const GoogleProvider = new GoogleAuthProvider();