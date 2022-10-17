import './Dashboard.css'
import Navbar from '../../../components/Common/navbar/Navbar';
import { useState } from 'react';
import { collection ,addDoc, Timestamp } from 'firebase/firestore';
import {ref, getDownloadURL,uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../../../backend/firebase-config'
import { v4 } from "uuid";

const DashBoard = () => {

    const dataCollectionRef = collection(db, "blogs-post")

    const [newTitle, setNewTitle] = useState('');
    const [newAuthor, setNewAuthor] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newCover, setNewCover] = useState(null);
    const [newText, setNewText] = useState('');
    const [newCategory, setNewCategory] = useState('')


    const [imgUrl, setImgUrl] = useState();
    const [progresspercent, setProgresspercent] = useState(0);

    const handleUpload = async () => {

    const storageRef = ref(storage, `CoverImages/${newCover.name+v4()}`);
    const uploadTask = uploadBytesResumable(storageRef, newCover);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgresspercent(progress);
        console.log(progress);
      },
      (error) => {
        alert(error);
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL)
          console.log(downloadURL)
        }).catch((error) => {console.log('Url Download Error' + error.message)})
      }
    );
  }

  const handleSubmit = async () => {

    if(newTitle === "" || newAuthor === "" || newDescription === "" || newText === ""){
      alert('Please fill all the field')
    }else{
      await addDoc(dataCollectionRef, {title: newTitle, author: newAuthor, description: newDescription, text: newText, cover: imgUrl,category: newCategory, createdAt: Timestamp.now().toDate(), comments:[]});
    }
    
  }


    return ( 
        <div className="dash-wrapper">
          <Navbar type="dashboard" />
        
            <form>
                <input type="text" className="input-primary" placeholder="Title" onChange={(e)=> {setNewTitle(e.target.value)}} />
                <input type="text" className="input-primary" placeholder="Author" onChange={(e)=> {setNewAuthor(e.target.value)}} />
                <input type="text" className="input-primary" placeholder="Category" onChange={(e)=> {setNewCategory(e.target.value)}} />
                <textarea maxLength="150"  className="description" placeholder="Description" onChange={(e)=> {setNewDescription(e.target.value)}} />
            </form>
            <div className="file-wrapper">
    
                <input type="file"  onChange={(e)=> {setNewCover(e.target.files[0])}} />
                <button className="btn-upload" onClick={handleUpload}>Upload Image</button>
            </div>
            {progresspercent === 0 ? null :
                <div className="p-bar" 
            style={{
              width: '400px', 
              height: '20px', 
              backgroundColor: 'grey', 
              borderRadius: '10px',
              transition:'ease-in-out',
              marginBottom: '2%'
              }}>
                <div style={{width: `${progresspercent}%`, 
                height:"inherit", 
                background: '#FFABE1',
                marginLeft:"0%",
                borderRadius: '10px',
                textAlign: 'center', 
                color: 'white',
                }}>{progresspercent === 100 ? "Upload Completed" : `${progresspercent}%`}</div>
            </div>}
            <form>
                <textarea className="text-area" placeholder="write here" onChange={(e)=> {setNewText(e.target.value)}} />
            </form>
            <div className="post-btn-wrapper">
            <button className="btn-upload" onClick={handleSubmit}>post</button>
            </div>
        </div>
     );
}

export default DashBoard;