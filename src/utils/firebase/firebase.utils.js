// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDTlGsL8l4oCunAjOZLts5Amf719LSOHSA",
    authDomain: "e-commerce-app-db-a96bf.firebaseapp.com",
    projectId: "e-commerce-app-db-a96bf",
    storageBucket: "e-commerce-app-db-a96bf.appspot.com",
    messagingSenderId: "526278486673",
    appId: "1:526278486673:web:8505adc30f979fe11b2d30"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth();

// Particular google configuration. We want a user to have to select an account upon loging in.
const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
    prompt: "select_account"
});

export const signInWithGooglePopup = () => signInWithPopup(auth, googleAuthProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleAuthProvider);


export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}
/*
Firestore: Where actual database tables exist
 */



export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth, kwargs) => {
    if (!userAuth) return;

    // Get user document INSTANCE
    const userDocRef = doc(
        db,
        'users',
        userAuth.uid
    );

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...kwargs,
            });
        } catch (error) {
            console.log("Error creating user...")
            console.log(error.message);
        }
    }

    return userDocRef;
}
