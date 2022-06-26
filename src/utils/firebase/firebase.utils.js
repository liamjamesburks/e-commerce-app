// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
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

/*
Auth provider and methods for Google authentication
 */
const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.setCustomParameters({
    prompt: "select_account"
});

export const signInWithGooglePopup = () => signInWithPopup(auth, googleAuthProvider);

/*
Auth method for signing in with email/password
 */
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

/*
Auth method for signing out user
 */
export const signOutUser = async () => {
    return await signOut(auth);
}

/*
Listener will execute whenever the auth state of the application has changed
 */
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

/*
Manage user document in actual firestore database
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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    })

    await batch.commit();
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
    // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    //     const { title, items } = docSnapshot.data();
    //     acc[title.toLowerCase()] = items;
    //     return acc;
    // }, {});
    //
    // return categoryMap;
}

