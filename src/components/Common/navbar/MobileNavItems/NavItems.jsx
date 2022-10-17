import "./NavItems.css"
import {Link} from 'react-router-dom'
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from "../../../../backend/firebase-config"


const NavItems = () => {

    const [user] =  useAuthState(auth);
    
    return ( 
        <div className="menu-list">
            <div className="nav-item-conatiner">
                <div className="nav-icon">
                    <img src="https://cdn-icons-png.flaticon.com/512/2163/2163350.png" alt="" width="30px" />
                </div>
                <Link to={`/`} className="nav-title">   
                    Home
                </Link>
            </div>
            <div className="nav-item-conatiner">
                <div className="nav-icon">
                    <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" width="30px" />
                </div>
                <div className="nav-title">
                    Profile
                </div>
            </div>
            <div className="nav-item-conatiner">
                <div className="nav-icon">
                    <img src="https://cdn-icons-png.flaticon.com/512/1991/1991103.png" alt="" width="30px" />
                </div>
                 <Link to={`/dashboard/${user.uid}`} className="nav-title">
                    Dashboard
                </Link>
            </div>
        </div>
     );
}
 
export default NavItems;