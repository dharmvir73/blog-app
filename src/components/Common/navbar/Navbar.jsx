import "./Navbar.css"
import {GoogleAuthProvider, signInWithPopup, signOut} from '@firebase/auth'
import {auth, db} from '../../../backend/firebase-config'
import {useAuthState} from 'react-firebase-hooks/auth'
import {setDoc, doc} from 'firebase/firestore';
import {Link} from 'react-router-dom'
import Logo from '../../../Images/Logo.png'
import Burger from '../../../Images/menu.png'
import { useState } from "react";
import NavItems from "./MobileNavItems/NavItems";


const Navbar = ({type}) => {

    const [user] =  useAuthState(auth);

    const provider = new GoogleAuthProvider();

    const signInWithGoogle = async () => {

        await signInWithPopup(auth, provider).then((result) => {
            userCollection(result.user)
        }).catch((error) => {console.log(error)})
    }

    const userCollection = async (user) => {
        await setDoc(doc(db, "/users/" + user.uid),{
            uid: user.uid,
            username: user.displayName,
            email: user.email,
            image: user.photoURL
        })
    }

    const [open, setOpen] = useState(false)

    const handleMenu = () => {
        setOpen(!open);
    }
    
    const [openMenu, setOpenMenu] = useState(false)

    const toggleMenu = () => {
        setOpenMenu(!openMenu);
    }
    


    return ( 
        <div className="navbar-wrapper">
            <div className="left">
                <img src={Logo} alt="Logo" className="logo"/>
            </div>
            <div className="right">
                    {
                    open === false ? 
                    <>
                     <img onClick={handleMenu} className="burger-menu" src={Burger} alt=""/>
                    </> 
                    : 
                    <>
                                
                     <div className="menu-container" style={{display:"flex",flexDirection:"column",position:"absolute",height: "100vh" ,width:"100vw",backgroundColor:"#256D85",  touchAction: "none",}}>
                        <div className="close-btn" onClick={handleMenu}>X</div>
                        <div className="profile-wrapper">
                            <div className="user-picture">
                                <div className="picture">
                                    <img src={user.photoURL} alt="profile_picture" width="40px" height="40px"/>
                                </div>
                                <div className="username">
                                    {user.displayName.split(" ")[0]}
                                </div>
                            </div>        
                        </div>

                        {/* navigation item options */}
                        <NavItems />
                        
                        <div style={{width:"100vw",padding:"30px 20px", color:"white"}}><img src="https://cdn-icons-png.flaticon.com/512/1828/1828490.png" alt="" width="20px"/>Logout</div>
                    </div>
                 
                    </>
                }
                {!user? 
                <>
                <button 
                    onClick={signInWithGoogle}
                    type="button">
                    <img width="15px" style={{ marginRight:"5px"}} alt="Google login" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                    Sign In with Google
                </button>
                </>   
                 : 
                <>
                <div className="user-info">

                <div className="dashboard" onClick={toggleMenu}>
                    Menu<img style={{marginLeft:"2px", transform: openMenu === false ? "rotate(0deg)" : "rotate(180deg)"}} src="https://cdn-icons-png.flaticon.com/512/57/57055.png" alt="dropdown" width="10px" height="10px"/>
                </div>
                <div className="MenuContainer" style={{display: openMenu ? 'block' : 'none'}}>
                    <Link className="item" to={`/dashboard/${user.uid}`}>Dashboard</Link>
                        <hr style={{width:"70%", marginTop:"4px", marginBottom:"4px"}}/>
                    <Link className="item" to={`/dashboard/${user.uid}`}>Profile</Link>
               </div>
                

                    {type !== "dashboard" ? 
                    <>
                    <Link className="dashboard"
                    to={`/create-post/${user.uid}`}>Create Post</Link>
                    </>
                    :
                    <>
                    <Link className="dashboard"
                     to={`/`}>Home</Link>
                </>
                     }
                    
                   <div className="rekt">
                   <p>{user.displayName.split(" ")[0]}</p> 
                    <img src={user.photoURL} alt="profilephoto"  height='30px' width='30px'/>
                    </div> 
                    <button onClick={()=>{signOut(auth)}}>Sign Out</button>
                </div>
                </>
                }
               
             
                
            </div>
        </div>
     );
}
 
export default Navbar;