import { initializeApp } from "firebase/app"
import { getFirestore, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth"

export const FbConfig = ()=> {
    
const firebaseConfig = {
    apiKey: "AIzaSyAjB91P-JK5tlBzd2eOxtv_6-l0Txb6Y50",
    authDomain: "todo-auth-e1a81.firebaseapp.com",
    projectId: "todo-auth-e1a81",
    storageBucket: "todo-auth-e1a81.firebasestorage.app",
    messagingSenderId: "1063415641224",
    appId: "1:1063415641224:web:51b0dbf9735414b357db3d"
  };

  initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();
const todosRef = collection(db, "todos");


    return { db, todosRef, auth }
}