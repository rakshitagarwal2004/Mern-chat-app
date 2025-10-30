import React, { useEffect } from 'react'
import './ProfileUpdate.css'
import assets from '../../assets/assets'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../Config/firebase';
import { doc,getDoc } from 'firebase/firestore';
import { Navigate, useNavigate } from 'react-router-dom';
import { db } from '../../Config/firebase'; // Adjust the path as necessary
import { toast } from 'react-toastify';
import upload from '../../Lib/Upload';
import { updateDoc } from 'firebase/firestore';

const ProfileUpdate = () => { // Assuming this function fetches user data

  const navigate = useNavigate();

  const [image, setImage] = React.useState(false);
  const [name, setName] = React.useState('');
  const [bio, setBio] = React.useState('');
  const [uid, setUid] = React.useState('');
  const [prevImage, setPrevImage] = React.useState('');

  const ProfileUpdate = async (e) => {
    e.preventDefault();
    try{
      if(!prevImage && image){
        toast.error("Please upload a profile image");
        return;
      }
      const docRef = doc(db, 'users', uid);
      if(image)
      {
        // Upload new image and update user document
        const imgUrl = await upload(image);
        setPrevImage(imgUrl);
        await updateDoc(docRef, {
          avatar: imgUrl,
          name:name,
          bio:bio
        });
      }
      else{
        await updateDoc(docRef, {
          name,
          bio
        });
      }
    }catch(error){
      console.error("Error updating profile:", error);
    }
  }

  useEffect(() => {
    // Fetch user data from API or context
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const docRef=doc(db, 'users', user.uid);
        const docSnap= await getDoc(docRef);

        if(docSnap.data().name)
        {
          setName(docSnap.data().name);
        }
        if(docSnap.data().bio)
        {
          setBio(docSnap.data().bio);
        }
        if(docSnap.data().avatar)
        {
          setPrevImage(docSnap.data().avatar);
        }
      } else {
        // User is signed out
        console.log("No user is signed in");
        navigate('/'); // Redirect to login if no user is signed in  
      }
    }); 
    
  }, );

  return (
    <div className='profile'>
      <div className='profile-container'>
        <form onSubmit={ProfileUpdate}>
              <h3>Profile Details</h3>
              <label htmlFor="avatar">
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='avatar' accept='.png, .peg, .jpg' hidden />
                <img src={image?URL.createObjectURL(image):assets.avatar_icon} alt="" />
                upload profile image
              </label>
              <input onChange={(e)=>{setName(e.target.value)}} value={name} type="text" placeholder='Enter your name' required />
              <textarea onChange={(e)=>{setBio(e.target.value)}} value={bio} placeholder='write profile bio' required></textarea>
              <button type='submit'>Save</button>
        </form>
        <img className='profile-pic' src={image?URL.createObjectURL(image):assets.logo_icon} alt="" />
      </div>
    </div>
  )
}

export default ProfileUpdate
