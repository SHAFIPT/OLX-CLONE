import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDbYKuNPvv0nfaFLihjApk2MucKAf_ipIA",
  authDomain: "olx-clone-504c8.firebaseapp.com",
  projectId: "olx-clone-504c8",
  storageBucket: "olx-clone-504c8.appspot.com",
  messagingSenderId: "669047367970",
  appId: "1:669047367970:web:f25d359e363a79291e5d7b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore
const storage = getStorage(app); // Initialize Storage
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export {db ,storage , auth , googleProvider , signInWithPopup ,app};