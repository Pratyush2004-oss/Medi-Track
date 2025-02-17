// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeHK80zZa75SDQQCPp4-bO_3LcENQUMvE",
  authDomain: "react-native-apps-22ebd.firebaseapp.com",
  projectId: "react-native-apps-22ebd",
  storageBucket: "react-native-apps-22ebd.firebasestorage.app",
  messagingSenderId: "209635075612",
  appId: "1:209635075612:web:ead8b95e7650ce135d61d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);