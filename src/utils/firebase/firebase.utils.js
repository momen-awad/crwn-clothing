import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCCxOsEIkK8bO1c8eCswVPO4LCu6-bTrvQ",
    authDomain: "crown-clothing-bd.firebaseapp.com",
    projectId: "crown-clothing-bd",
    storageBucket: "crown-clothing-bd.appspot.com",
    messagingSenderId: "849949025117",
    appId: "1:849949025117:web:caf9cd404adeabf370feb4"
};

// creating firebase app
const firebaseApp = initializeApp(firebaseConfig);

//creating sign-up with google provider
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt : 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth,provider);

//creating fire store database and add auth userser's to user's collection
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth,additionalInformation={}) => {
    if(!userAuth)return;
    const userDocRef = doc(db,'users',userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()){
        const {displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error){
            console.log(`error creating a new user ${error.message}`);
        }
    }

    return userDocRef;
}

//ceating auth user using email and password
export const createAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth,email, password );
}

// sign in with email and password

export const signInAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth,email,password);
}

//signing out user

export const signOutUser = async () => {
    await signOut(auth);
}

// observer

export const onAuthStateChangedListner = (callback) => onAuthStateChanged(auth,callback);


export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db,collectionKey);

    const batch = writeBatch(db);

    objectsToAdd.forEach(object => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef,object);
    });

    await batch.commit();

}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, "categories");
    const q = query(collectionRef);
    const querySnapShot = await getDocs(q);


    const categoryMap = querySnapShot.docs.reduce((acc,docSnapShot) => {
        const { title, items } = docSnapShot.data();
        acc[title.toLowerCase()] = items;

        return acc;
    },{})

    return categoryMap;
}