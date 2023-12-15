import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { Platform } from "react-native";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {
  firebase_apiKey,
  firebase_authDomain,
  firebase_projectId,
  firebase_storageBucket,
  firebase_messagingSenderId,
  firebase_appId,
  firebase_measurementId,
} from "@env";

const firebaseConfig = {
  apiKey: firebase_apiKey,
  authDomain: firebase_authDomain,
  projectId: firebase_projectId,
  storageBucket: firebase_storageBucket,
  messagingSenderId: firebase_messagingSenderId,
  appId: firebase_appId,
  measurementId: firebase_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(
  app,
  Platform.OS === "web"
    ? null
    : {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage),
      }
);

export { db, app, auth };
