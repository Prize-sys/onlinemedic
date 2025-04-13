import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = initializeApp({
    apiKey: "AIzaSyBpAyYXqRBe2VVe_00dnQ8YSxYbiCR0HW4",
    authDomain: "onlinemedic-d344d.firebaseapp.com",
    projectId: "onlinemedic-d344d",
    storageBucket: "onlinemedic-d344d.firebasestorage.app",
    messagingSenderId: "415223622550",
    appId: "1:415223622550:web:8caf5b9f13b4b8c8674bb7",
    measurementId: "G-J0RB3LJZPD"
});

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
