import "./Navbar.css"
import {GoogleAuthProvider, signInWithPopup, signOut} from '@firebase/auth'
import {auth, db} from '../../../backend/firebase-config'
import {useAuthState} from 'react-firebase-hooks/auth'
import {setDoc, doc, updateDoc, getDoc, arrayUnion, addDoc, collection, getDocs} from 'firebase/firestore';
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

        const docRef = doc(db, "user-details", user.uid)

        const docSnap = await getDoc(docRef)

        console.log(docSnap.data())

        console.log(user.uid)

        if(docSnap.data() === undefined) {
            await setDoc(doc(db, "/user-details/" + user.uid),{
                uid: user.uid,
                username: user.displayName,
                email: user.email,
                image: user.photoURL,
                follower: arrayUnion(),
                following: arrayUnion(),
            })
        }else{
            return;
        }
    }

    const LogOut = () => {
        sessionStorage.clear();
        localStorage.clear();
        signOut(auth);
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

            {/* Logo Section */}
            <div className="left">
                <Link to={`/`}>
                <img src={Logo} alt="Logo" className="logo"/>
                </Link>
            </div>

            {/* Menu  */}
            <div className="center">

            <div className="menu-wrapper">
                {user && <>
                <Link style={{textDecoration: "none", color:type === "Home" ? "#0077b6" : "black"}} to={`/`}>
                    <div className="menu-item" style={{border: type === "Home" ? "2px solid #0077b6" : "none" ,borderRadius: "10px"  }}>
                    <span>
                    {type === "Home" ? <img src="https://cdn-user-icons.flaticon.com/84735/84735802/1668687773294.svg?token=exp=1668688620~hmac=7b570890678ab47cae9ae9a562e36201" alt="home" height="18px" width="18px"/>
                    :
                    <img src="https://cdn-icons-png.flaticon.com/512/263/263115.png" alt="home" height="18px" width="18px"/>}
                    </span> 
                    <span>Home</span>
                </div>
                </Link>
                
                <Link style={{textDecoration: "none", color:type === "profile" ? "#0077b6" : "black"}} to={`/profile/${user.uid}`}>
                <div className="menu-item" style={{border: type === "profile" ? "2px solid #0077b6" : "none" ,borderRadius: "10px"  }}>
                <span><img src="https://cdn-icons-png.flaticon.com/512/263/263058.png" alt="home" height="18px" width="18px"/></span>
                <span>Profile</span>
                </div>
                </Link>

                <Link style={{textDecoration: "none", color:type === "dashboard" ? "#0077b6" : "black"}} to={`/dashboard/${user.uid}`}>
                <div className="menu-item" style={{border: type === "dashboard" ? "2px solid #0077b6" : "none" ,borderRadius: "10px", width:"100px"}}>
                <span><img src="https://cdn-icons-png.flaticon.com/512/263/263082.png" alt="home" height="18px" width="18px"/></span>
                <span>Dashboard</span>
                </div>
                </Link>

                <Link style={{textDecoration: "none", color:type === "createPost" ? "#0077b6" : "black"}} to={`/create-post/${user.uid}`}>
                <div className="menu-item" style={{border: type === "createPost" ? "2px solid #0077b6" : "none" ,borderRadius: "10px", width:"110px" }}>
                <span><img src="https://cdn-icons-png.flaticon.com/512/263/263062.png" alt="home" height="18px" width="18px"/></span>
                <span>Create Post</span>
                </div>
                </Link>
                </>}
            </div>
            </div>

            {/* login/logout section user information details */}

            <div className="right">
                    {
                    open === false ? 
                    <>
                    <img onClick={handleMenu} className="burger-menu" src={Burger} alt=""/>
                    </> 
                    : 
                    <>       
                    <div className="menu-container" >
                        <div className="close-btn" onClick={handleMenu}>X</div>
                        <div className="profile-wrapper">
                            <div className="user-picture">
                                <div className="picture">
                                    <img src={user.photoURL} alt="" width="40px" height="40px"/>
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
                    <button className="SignIn"
                    onClick={signInWithGoogle}
                    type="button">
                    <img className="GoogleLogo" width="15px" style={{ marginRight:"5px"}} alt="GoogleLogo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                        Sign In with Google
                    </button>
                    </>   
                     : 
                    <>
                    <div className="user-login-info">                 
                    <img className="user-image" src={user.photoURL} alt="" height='32px' width='32px'/>
                    <Link className="logout-btn" style={{textDecoration:"none", color:"black", border: "2px solid black", padding:"8px 16px", borderRadius: "10px"}} onClick={LogOut} to={`/`}>logout</Link>
                    </div>
                    </>}
               
                {/*!user?   
                <>
                <button className="SignOut"
                    onClick={signInWithGoogle}
                    type="button">
                    <img width="15px" style={{ marginRight:"5px"}} alt="Google login" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                    Sign In with Google
                </button>
                </>   
                 : 
                <>
                <div className="user-info">
                   <div className="rekt">
                   <p>{user.displayName.split(" ")[0]}</p> 
                    <img src={user.photoURL} alt=""  height='30px' width='30px'/>
                    </div> 
                    <Link className="SignOut" onClick={LogOut} to={`/`}>Sign Out</Link>
                </div>
                </>
            */}

            </div>
        </div>
     );
}
 
export default Navbar;