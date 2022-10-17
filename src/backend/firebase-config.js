import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getStorage } from "@firebase/storage"
import { getAuth } from "@firebase/auth"



const firebaseConfig = {
    apiKey: "AIzaSyD_v3WYA1f4ltiKkJJOShUWPGRn-hrFlLY",
    authDomain: "blog-app-7b411.firebaseapp.com",
    projectId: "blog-app-7b411",
    storageBucket: "blog-app-7b411.appspot.com",
    messagingSenderId: "352027614829",
    appId: "1:352027614829:web:c7e0642fb058d5fea4a964",
    measurementId: "G-EXKBHGB3LC"
  };


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
