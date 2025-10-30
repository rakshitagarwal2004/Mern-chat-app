import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../Config/firebase'; // adjust path accordingly
import { AppContext } from './AppContext';
import { auth } from '../Config/firebase'; // adjust path accordingly
const AppContextProvider = (props) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [chatData, setChatData] = useState(null);

    const loadUserData = async (uid) => {
        try {
            const userRef = doc(db, 'users', uid);
            const userSnap = await getDoc(userRef);
            const userData = userSnap.data();
            setUserData(userData);

            if (userData?.avatar && userData?.name) {
                navigate('/chat');
            } else {
                navigate('/profile');
            }

            await updateDoc(userRef, {
                lastSeen: Date.now(),
                lastActive: serverTimestamp()
            })  
            setInterval(async () => {
               if(auth.chatUser){
                   await updateDoc(userRef, {
                       lastSeen: Date.now(),
                       lastActive: serverTimestamp()
                   });
               }
            }, 60000); // Update every 10 seconds
        } catch (error) {
            console.error("Error loading user data:", error);
        }
    };

    const value = {
        userData, setUserData,
        chatData, setChatData,
        loadUserData
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
