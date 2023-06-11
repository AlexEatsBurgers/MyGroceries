import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCV4eGM12H_yivfU2jsmBIJvWoPQpToeQQ",
  authDomain: "groceries-fa1d9.firebaseapp.com",
  databaseURL: "https://groceries-fa1d9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "groceries-fa1d9",
  storageBucket: "groceries-fa1d9.appspot.com",
  messagingSenderId: "88016104827",
  appId: "1:88016104827:web:7d14606feda55fb01061de"
}

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
