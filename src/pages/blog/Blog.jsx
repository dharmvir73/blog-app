import {useParams} from 'react-router'
import {Link} from 'react-router-dom'
import { useEffect, useState, useRef } from 'react';
import { arrayUnion, doc, getDoc, Timestamp, updateDoc, onSnapshot} from "firebase/firestore";
import Loading from "../../Images/Loding/Ripple.gif"
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth, db} from '../../backend/firebase-config'
import { v4 } from "uuid";
import Lable from '../../components/Common/lable/Lable';
import Navbar from '../../components/Common/navbar/Navbar'
import "./Blog.css"

const Blog = () => {

    const [user] = useAuthState(auth)

    const {id} = useParams();

    const [blogTitle, setBlogTitle] = useState("")

    const [blogAuthor, setBlogAuthor] = useState("")

    const [blogDate, setBlogDate] = useState("")

    const [blogCover, setBlogCover] = useState("")

    const [blogText, setBlogText] = useState("")

    const [blogCat, setBlogCat] = useState("")

    const [blog, setBlog] = useState()

    const [comment, setComment] = useState("")

    const [comments, setComments] = useState([])

    const blogRef = doc(db, 'blogs-post', id);

    const loadBlog = async () => {
        const blog = await getDoc(blogRef)
        if (blog.exists()) {
            setBlog(blog.data())
            setBlogTitle(blog.data().title)
            setBlogAuthor(blog.data().author)
            setBlogDate(blog.data().createdAt.toDate().toDateString())
            setBlogCover(blog.data().cover)
            setBlogCat(blog.data().category)
            setBlogText(blog.data().text)
            setComments(blog.data().comments)
          }
          else {
            console.log("No such document")
          }

      }

    useEffect(()  =>  {

      setTimeout(() => {loadBlog();},1000)
      
    },[])

    const inputRef = useRef(null);
  
  const handleComment = async () => {
    await updateDoc(doc(db, 'blogs-post', id),{
      comments: arrayUnion({
        commentId: v4(),
        userId: user.uid,
        userPic: user.photoURL,
        userName: user.displayName,
        comment: comment,
        createdAt: Timestamp.now().toDate()
      })}).then(
        inputRef.current.value = ""
      )
    }

  useEffect(()  =>  {
      onSnapshot(doc(db, "blogs-post", id), (doc) => {
      setComments(doc.data().comments)})
  },[])
    
    return ( 
        <div className="main">
          <Navbar type="create-post" />
        <div className="blog-wrapper">

          {blog === undefined ? <><img className="Loading" src={Loading} alt="Loading..." height="100px" width="100px"/></> 
          : 
          <>
          <div className="top-wrapper">
          <div className="content-wrapper">
          <span className="label">
          <Lable lable={blogCat}/>
          </span>  
          <span>
          </span>
          <span style={{width:"20vw"}}>
          <h1 style={{fontSize: `${blogTitle.length>15 ? '1.5rem' : '2.5rem'}`}}>{blogTitle}</h1>
          </span>
         <span style={{width:"25vw", display:"flex", flexDirection:"column",}}>
         <h4 style={{marginLeft:"5rem"}}>author : {blogAuthor}</h4>
         <p style={{marginLeft:"5rem"}} className="Date">published date : {blogDate.toLowerCase()}</p>
         </span>     
          </div>
          </div>
          <img className="Cover" src={blogCover} alt="cover" height={window.innerHeight / 2 * 2} width={window.innerWidth / 2 * 1.5}/>
          <p className="blog-text">{blogText}</p>
          {
            user === null ? <>
            <Link to={`/`}>Please Login To Comment</Link></> : <>
            <div className="comment-wrapper">
              <h3 style={{marginBottom:"1rem"}}>Comments</h3>
          <div className="comment-section">
           {/* <p>
            <img src={user.photoURL} alt="" height="30px" width="30px" style={{borderRadius:'20px'}} /> 
            {user.displayName}:
          </p>*/}
            <div className="create-comment">
              <textarea ref={inputRef} type="text" onChange={(e)=>{setComment(e.target.value)}} />
              <button className="comment-btn" onClick={handleComment}>Send</button>
            </div>
          </div>
          <div className="comment-scroller">
            {
              comments.map((comments)=>(
                <div className="comments" key={comments.commentId}>
                  <div className="comment-title">
                    <img src={comments.userPic} width="30px" height="30px" alt=""
                    style={{borderRadius:"50%"}} />
                  <div style={{marginLeft:"40px",marginTop:"-27px",fontSize:"0.9rem", fontFamily:"'Nunito', sans-serif"}}>{comments.userName}
                  </div>
                  </div>
                  <p className="comment-text">{comments.comment}</p>
                  <p style={{marginTop:"10px", fontSize:"0.7rem",}} className="comment-text">{comments.createdAt.toDate().toDateString()}</p>
                </div>
              )).reverse()
            }
            </div>
          </div></>
            }
          </>}
        </div>
        </div>
     );
}
 
export default Blog;