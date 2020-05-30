import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firestore'

let firebaseConfig = {
    apiKey: "AIzaSyCG27ZydltdFWclX8oqBtbtVB61mO46P_c",
    authDomain: "auth-reacthooks-redux-graphql.firebaseapp.com",
    databaseURL: "https://auth-reacthooks-redux-graphql.firebaseio.com",
    projectId: "auth-reacthooks-redux-graphql",
    storageBucket: "auth-reacthooks-redux-graphql.appspot.com",
    messagingSenderId: "618939542891",
    appId: "1:618939542891:web:6550cd024a12854c9a302e",
    measurementId: "G-L402D1P6ZF"
  };

  firebase.initializeApp(firebaseConfig);

  let db = firebase.firestore().collection('favs')

export let updateDB =(favs, uid) => {
    return db.doc(uid).set({favs})
    .catch(err=> console.log(err.message))
}

export let getFavs = (uid) => {
    return db.doc(uid).get()
    .then(snap => snap.data().favs)
}

export let loginWithGoogle = () => {
    let provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .then(snap => snap.user)
}

export let signOutGoogle = () => {
    firebase.auth().signOut()
}