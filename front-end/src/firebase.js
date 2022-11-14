import firebase from "firebase/app"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCmNgx-85bdx5L_fJxI844jdAQ9mlDxxT4",
  authDomain: "period-pejai.firebaseapp.com",
  projectId: "period-pejai",
  storageBucket: "period-pejai.appspot.com",
  messagingSenderId: "1068916256161",
  appId: "1:1068916256161:web:793537c61ae1f915daafe0",
  measurementId: "G-K1XDC06Z0D"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
