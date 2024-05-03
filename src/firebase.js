import { initializeApp } from "firebase/app"; // Correct import for the modular SDK
import { getAuth } from "firebase/auth"; // Import Firebase Authentication
import { getFirestore } from "firebase/firestore"; // Import Firebase Firestore

const firebaseConfig = {
    apiKey: "AIzaSyC5AtfUmvKoHHVFnCeWdk0N0ChTrTND-3E",
    authDomain: "jays-kitchen-573df.firebaseapp.com",
    projectId: "jays-kitchen-573df",
    storageBucket: "jays-kitchen-573df",
    messagingSenderId: "773257912809",
    appId: "1:773257912809:web:962f4dc9e037504159ab78",
    measurementId: "G-WTF5DD7TZF",
};

const app = initializeApp(firebaseConfig); // Initialize Firebase app
const auth = getAuth(app); // Initialize Firebase Authentication
const db = getFirestore(app); // Initialize Firestore

export { auth, db }; // Export the initialized Firebase instances
