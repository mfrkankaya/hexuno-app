import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDNFDUH1EBqNfiNqywcQDt7PnpDJUSuqKw',
  authDomain: 'hexuno-d366f.firebaseapp.com',
  databaseURL:
    'https://hexuno-d366f-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'hexuno-d366f',
  storageBucket: 'hexuno-d366f.appspot.com',
  messagingSenderId: '1051973443520',
  appId: '1:1051973443520:web:7729ae77e239241ab13225',
  measurementId: 'G-4MXN7TL0PH'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
