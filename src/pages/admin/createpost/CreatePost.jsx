import './CreatePost.css'
import Navbar from '../../../components/Common/navbar/Navbar';
import { useState } from 'react';
import { collection ,addDoc, Timestamp } from 'firebase/firestore';
import {ref, getDownloadURL,uploadBytesResumable } from 'firebase/storage';
import { auth, db, storage } from '../../../backend/firebase-config'
import { v4 } from "uuid";
import {useAuthState} from 'react-firebase-hooks/auth'

const CreatePost = () => {

    const[user] = useAuthState(auth)

    const [popup, setPopup] = useState(false)

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
      await addDoc(dataCollectionRef, 
        {
          title: newTitle, 
          author: newAuthor, 
          description: newDescription, 
          text: newText, 
          cover: imgUrl,
          category: newCategory, 
          createdAt: Timestamp.now().toDate(), 
          comments:[],
          uid: user.uid,
          blogId: v4(),
          
        }
          ).then(() =>{
            console.log('post added successfully')
            setPopup(true)
          }).catch((err) => console.log(err + "an error occurred while uploading"));
      }
  }

  const handlePopup = () => {
    setPopup(false)
    window.location.reload();
  }



    return ( 
        <div className="dash-wrapper">
          <Navbar type="dashboard" />
          {
            popup === true ?           
            <div className="popup">
              <div>post uploaded successfully</div>
              <button onClick={handlePopup}>Done</button>
            </div>
            :
            null
           }
            <form>
                <div className="input-container">
                <div className="input-title">add your title</div>
                <input type="text" className="input-primary" placeholder="" onChange={(e)=> {setNewTitle(e.target.value)}} />
                </div>
                <div className="input-container">
                <div className="input-title">add your name</div>
                <input type="text" className="input-primary" placeholder="" onChange={(e)=> {setNewAuthor(e.target.value)}} />
                </div>
                <div className="input-container">
                <div className="input-title">write description</div>
                <textarea style={{height:"192px", resize:"none",paddingTop:"10px"}} type="text" className="input-primary" placeholder="" onChange={(e)=> {setNewDescription(e.target.value)}} />
                </div>
                <div className="input-container">
                <div className="input-title">select category</div>
                <select  type="text" className="input-primary" placeholder="" onChange={(e)=> {setNewCategory(e.target.value)}}>
                  <option>Technology</option>
                  <option>Fashion</option>
                  <option>Programming</option>
                  <option>Health</option>
                  <option>Finance</option>
                  <option>Sports</option>
                </select>
            
              <div>
              {
                progresspercent === 0 ? <>
                <div 
                style={{
                  width: '100%', 
                  height: '20px',
                  marginBottom:"40px",
                  marginTop:"40px"
                }}
                ></div></> :
              <div
            
              style={{
                      width: '100%', 
                      height: '20px', 
                      backgroundColor: 'grey',                   
                      transition:'ease-in-out',
                      marginBottom:"40px",
                      marginTop:"40px"
                    }}>
                <div style={{
                      width: `${progresspercent}%`, 
                      height:"inherit", 
                      background: '#FFABE1',
                      marginLeft:"0%",
                      textAlign: 'center', 
                      color: 'white',
                    }}>
                      {progresspercent === 100 ? "Upload Completed" : `${progresspercent}%`}
                </div>
              </div>
              }
              <div className="button-container">  
                <input type="file"  onChange={(e)=> {setNewCover(e.target.files[0])}} />
                <div className="imageUpload-btn" onClick={handleUpload}>upload image</div>
                </div>
              </div>                 
            </div>
          </form>
            
            <form style={{ marginTop:"2rem"}}>
            <div className="input-title" style={{width:"91.6%"}}>write article</div>
                <textarea className="article-area" placeholder="" onChange={(e)=> {setNewText(e.target.value)}} />
            </form>
            <div className="postUpload-wrapper">
            <button className="postUpload-button" >clear</button>
            <button className="postUpload-button" onClick={handleSubmit}>post</button>
         </div>
        </div>
     );
  }

export default CreatePost;