import "./Login.css"
import {useState} from "react"
import { useNavigate } from "react-router-dom"


const Login = () => {

    const [username, setUsername] = useState()
    const [pass, setPass] = useState()

    const verify = () => {
        const matchUserName = "admin";
        const matchPassword = "admin"

        if(matchUserName !== username || matchPassword !== pass){
            
            window.alert('!unknown username or password 😬')
        }else{
            navigate('/dashboard')
            }
    }

    const navigate = useNavigate();

    return (
        <div className="wrapper">
            <h2 style={{marginBottom: '20px'}}>admin</h2>
                <form>
                    <input type="text" placeholder="username" onChange={(e)=>{setUsername(e.target.value)}}/>
                    <input type="password" placeholder="password" onChange={(e)=>{setPass(e.target.value)}}/>
                </form>
                <button className="submit-btn" onClick={verify}>Submit</button>
        </div>
     );
}
 
export default Login;