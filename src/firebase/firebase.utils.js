import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAVD1HLjvAay7ohihjNgDIt-hqNCV7RFtk",
  authDomain: "crwn-clothing-3061a.firebaseapp.com",
  projectId: "crwn-clothing-3061a",
  storageBucket: "crwn-clothing-3061a.appspot.com",
  messagingSenderId: "1086423670194",
  appId: "1:1086423670194:web:8cacdfe70eb85b9a3218ab",
  measurementId: "G-RWQ23LFE92"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email,photoURL} = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
