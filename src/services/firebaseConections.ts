// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyDv84CqFLpPyHLVyEeKtjX1YZ40knXAEDA',
  authDomain: 'tickets-609da.firebaseapp.com',
  projectId: 'tickets-609da',
  storageBucket: 'tickets-609da.appspot.com',
  messagingSenderId: '842426953073',
  appId: '1:842426953073:web:e5ac74ac022cbfe17ddad0',
  measurementId: 'G-DDLV8MX8L8',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const auth = getAuth(app)

const storage = getStorage(app)

export { db, auth, storage }
