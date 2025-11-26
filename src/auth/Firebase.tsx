// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCifEAtO3bjYbgYQtFfQ7u0F5fxtZEmdmY",
  authDomain: "topfit-e0ebe.firebaseapp.com",
  projectId: "topfit-e0ebe",
  storageBucket: "topfit-e0ebe.firebasestorage.app",
  messagingSenderId: "4744183732",
  appId: "1:4744183732:web:118047c971abde3c113ce1",
  measurementId: "G-E6JTKYC9KF"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
logEvent(analytics, "notification_received");
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
export const db = getFirestore(app);
