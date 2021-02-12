import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB1D7khwmdRULwfJAtRf8WzpicS9RiGbSU",
    authDomain: "spotif-app.firebaseapp.com",
    projectId: "spotif-app",
    storageBucket: "spotif-app.appspot.com",
    messagingSenderId: "54907224978",
    appId: "1:54907224978:web:8605768f2bde4b73c7374b"
  };

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export {firebase, database as default};