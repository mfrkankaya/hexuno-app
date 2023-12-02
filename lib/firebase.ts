import AsyncStorage from "@react-native-async-storage/async-storage"
import { initializeApp } from "firebase/app"
import { getReactNativePersistence, initializeAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDhapJsy7ZyenVhRNKoZdYH4oURDSzkfO8",
  authDomain: "notes-app-2f036.firebaseapp.com",
  projectId: "notes-app-2f036",
  storageBucket: "notes-app-2f036.appspot.com",
  messagingSenderId: "863791832999",
  appId: "1:863791832999:web:d1e29e1fb784772f326082",
  measurementId: "G-1WR5QB73G4",
}

const app = initializeApp(firebaseConfig)

export const firestore = getFirestore(app)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})
