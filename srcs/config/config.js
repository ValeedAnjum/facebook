import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBe9szdfTK4YpmvUO3amPf7yyd9CZXGorU",
    authDomain: "facebook-842b3.firebaseapp.com",
    databaseURL: "https://facebook-842b3.firebaseio.com",
    projectId: "facebook-842b3",
    storageBucket: "facebook-842b3.appspot.com",
    messagingSenderId: "357427932225",
    appId: "1:357427932225:web:c1cea154ffe303a3782ac0",
    measurementId: "G-E86JWS3DXP"
};

firebase.initializeApp(firebaseConfig);

export default firebase;