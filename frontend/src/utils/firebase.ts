// src/utils/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAsibHw3ga2sh65MAMZSHybShbQ08gSjew",
  authDomain: "cookpilot-121da.firebaseapp.com",
  projectId: "cookpilot-121da",
  storageBucket: "cookpilot-121da.appspot.com",
  messagingSenderId: "780105646457",
  appId: "1:780105646457:web:d8dcde5f94f5d7acebefa8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
