import "./Dashboard.css"
import Navbar from "../../components/Common/navbar/Navbar";
import Dashboarditem from "../../components/Dashboard/dashboardItems/Dashboarditem"
import {useEffect, useState} from "react"
import {db} from "../../backend/firebase-config"
import { collection, query, where, getDocs } from "firebase/firestore";
import { useParams } from "react-router"

const Dashboard = () => {

    const [item, setItem] = useState([])

    const {id} = useParams()
        
    let temp = []
    
    let arr = {}

    const getData = async () => {

        const condition = where("uid", "==", id)

        const q = query(collection(db, "blogs-post"), condition)

        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {

            temp.push({data:doc.data(), id: doc.id})       

            arr = temp

            const result = arr.reduce((finalArray, current) => {
                let obj = finalArray.find((item) => item.id === current.id)

                if(obj){
                    return finalArray
                }else{
                    return finalArray.concat([current])
                }
            },[])

            setItem([...result])

               console.log([...result])

                })
        }
    
    useEffect(() => {

        getData();

    },[])

    return (
        <div className="Wrapper">
              <Navbar />
              <Dashboarditem Items={item} />
        </div>
     );
}
 
export default Dashboard;