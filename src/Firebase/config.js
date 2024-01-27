import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLiD9rOREI4SAEQL8ypYRvBP8gDKpVQqg",
  authDomain: "miniblog-6d3d5.firebaseapp.com",
  projectId: "miniblog-6d3d5",
  storageBucket: "miniblog-6d3d5.appspot.com",
  messagingSenderId: "431076735910",
  appId: "1:431076735910:web:62645ee327bd0a87332d67"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

 export  { auth, db }