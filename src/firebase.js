import { getFirestore } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
//import{auth } from 'firebase/auth';
//import * as firebase from './firebase';
//import auth from '@react-native-firebase/auth';

import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAQ0Qx1ZpxJBbBvilBNPDjxIeEZvMZHefg",
    authDomain: "projet-pir-b8124.firebaseapp.com",
    projectId: "projet-pir-b8124",
    storageBucket: "projet-pir-b8124.appspot.com",
    messagingSenderId: "959713006207",
    appId: "1:959713006207:web:8110177268db94319ee54a",
  };


//const app = initializeApp(firebaseConfig);
//export {app};

// Initialize Cloud Firestore and get a reference to the service
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//const firebaseauth= auth();
//export {app};
//const firebaseauth= auth();
//export {app};
export { db, app };
//export{firebaseauth};

/*rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if
          request.time < timestamp.date(2023, 6, 11);
    }
  }
}*/