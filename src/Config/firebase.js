// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth ,signInWithEmailAndPassword,signOut} from "firebase/auth";
import { getFirestore,setDoc ,doc} from "firebase/firestore";
import { toast } from "react-toastify";
import { serverTimestamp } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfRCzeAvIXT731yj8oOcl-RT2DLO5qxSw",
  authDomain: "chat-app-gs-cabd3.firebaseapp.com",
  projectId: "chat-app-gs-cabd3",
  storageBucket: "chat-app-gs-cabd3.firebasestorage.app",
  messagingSenderId: "545144779578",
  appId: "1:545144779578:web:2c08f89972f862823e9603"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth= getAuth(app);
const db = getFirestore(app);

const signup= async(username,email,password)=>{
    // Your signup logic here
    try{
        const res=await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await setDoc(doc(db, "users", user.uid), {
            id: user.uid,
            username: username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio:"Hey, There i am using Chat App",
            lastSeen:  serverTimestamp(),
        })
        await setDoc(doc(db, "Chats", user.uid), {
            ChatData: []
        });
    }
    catch(error){
        console.error("Error signing up:", error);
        toast.error(error.message || "An error occurred");
    }   
}

const login = async (email, password) => {
    // Your login logic here
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const user = res.user;
        console.log("User logged in:", user);
    } catch (error) {
        console.error("Error logging in:", error);
        toast.error(error.message || "An error occurred");
    }
}

const logout = async () => {
    // Your logout logic here
    try {
        await signOut(auth);
        console.log("User logged out");
    } catch (error) {
        console.error("Error logging out:", error);
        toast.error(error.message || "An error occurred");
    }
}

export { signup, login, logout ,auth, db };