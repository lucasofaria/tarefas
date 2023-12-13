import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyAFDfJ7kh1aex8mX-FNVyefcubrDESA5tY",
    authDomain: "tarefas-a6948.firebaseapp.com",
    projectId: "tarefas-a6948",
    storageBucket: "tarefas-a6948.appspot.com",
    messagingSenderId: "861165512247",
    appId: "1:861165512247:web:f737a9bc7a997fbd1f81b2",
    measurementId: "G-6EMGN5E4YG"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;