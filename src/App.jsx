import  { useEffect ,useContext} from 'react'
import {Routes, Route, useNavigate } from 'react-router-dom'
import Login from './Pages/Login/Login.jsx'
import ProfileUpdate from './Pages/ProfileUpdate/ProfileUpdate.jsx'
import Chat from './Pages/Chat/Chat.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './Config/firebase.js'
import { AppContext } from './Context/AppContext.jsx'
const App = () => {

  const navigate = useNavigate();

  const {loadUserData} = useContext(AppContext);

  useEffect(() => {
    document.title = "Chat App";
    onAuthStateChanged(auth, async(user) => {
      if (user) {
        console.log("User is logged in:", user);
        navigate('/chat');
        await loadUserData(user.uid);
      } else {
        console.log("No user is logged in");
        navigate('/');
      }
    });
  }, [navigate, loadUserData]);

  return (
    <>
    <ToastContainer/> 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<ProfileUpdate />} />
        <Route path="/chat" element={<Chat />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  )
}

export default App
