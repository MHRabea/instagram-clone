
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { DataBase } from "./database";




const firebaseConfig = {
  apiKey: "AIzaSyCK0W5RfumS23em9oe1Crv8vjSYUS9h3BA",
  authDomain: "instaclone-cbf5c.firebaseapp.com",
  projectId: "instaclone-cbf5c",
  storageBucket: "instaclone-cbf5c.appspot.com",
  messagingSenderId: "783896531430",
  appId: "1:783896531430:web:a0bcfae3a312721c538627"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

DataBase(app)