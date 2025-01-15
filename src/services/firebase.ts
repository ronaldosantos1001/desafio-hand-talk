import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Substitua com suas credenciais do Firebase
const firebaseConfig = {
   apiKey: "AIzaSyB-qQLqgHQ5-fkDiY3tw-K-ituVbp93ccY",
  authDomain: "desafio-hand-talk-6a2c1.firebaseapp.com",
  projectId: "desafio-hand-talk-6a2c1",
  storageBucket: "desafio-hand-talk-6a2c1.firebasestorage.app",
  messagingSenderId: "192005873337",
  appId: "1:192005873337:web:905a0bd5fe5c514c184568"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);
