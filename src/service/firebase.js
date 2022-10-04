import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAxJbC_7F_EfRPKCI3fACcG44Oqlg1S3go",
  authDomain: "pickingrecord.firebaseapp.com",
  projectId: "pickingrecord",
  storageBucket: "pickingrecord.appspot.com",
  messagingSenderId: "552197639945",
  appId: "1:552197639945:web:0e599756da400b669f8dd8",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const googleAuthProvider = new GoogleAuthProvider();
export const database = getDatabase(firebaseApp);
