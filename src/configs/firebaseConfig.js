
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCzMkL3L8vX3lp1e7SZJEOUtd_z00NtBOs",
  authDomain: "the-genesis-project-ccfcb.firebaseapp.com",
  projectId: "the-genesis-project-ccfcb",
  storageBucket: "the-genesis-project-ccfcb.firebasestorage.app",
  messagingSenderId: "982076644670",
  appId: "1:982076644670:web:d1af69fbfe125652a4a06f",
  measurementId: "G-D04DDY6J37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, db, auth, analytics };