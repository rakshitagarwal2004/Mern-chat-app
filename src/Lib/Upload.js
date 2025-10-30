import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";



const upload= async(file)=>{
    return new Promise((resolve, reject) => {
        const storage = getStorage();
const storageRef = ref(storage, `images/${Date.now()}-${file.name}`); // Use template literals for dynamic file naming
// Create a reference to 'images/${Date.now()}-${file.name}'

const uploadTask = uploadBytesResumable(storageRef, file);


uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
    console.error("Upload failed:", error);
    reject(error);
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      return(downloadURL);
    });
  }
);
});
};
export default upload;