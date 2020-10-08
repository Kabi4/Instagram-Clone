import firebase from 'firebase';
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAY6fIeY-hrHEgseC8jdR1Ij96fQHSGPYQ",
    authDomain: "instagram-clone-1dc93.firebaseapp.com",
    databaseURL: "https://instagram-clone-1dc93.firebaseio.com",
    projectId: "instagram-clone-1dc93",
    storageBucket: "instagram-clone-1dc93.appspot.com",
    messagingSenderId: "928434513708",
    appId: "1:928434513708:web:b6e28c986d3aec5e01ee89",
    measurementId: "G-17HD51MJMD"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db,auth,storage};