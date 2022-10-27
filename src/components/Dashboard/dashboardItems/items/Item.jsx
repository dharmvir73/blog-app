import "./Item.css"
import {db} from "../../../../backend/firebase-config"
import { doc, deleteDoc } from "firebase/firestore";

const Item = ({Items:{data,id}}) => {

    const handleRemove = async () => {
        await deleteDoc(doc(db, "blogs-post", id));
    }
   
    return(
        <div className="Posts">
        <img src={data.cover} alt="" style={{width: '100%', height: '100%', }}/>
            <div className="Bottom">
                <div className="Update">Edit</div>
                <div className="Remove" onClick={handleRemove} >Remove</div>
            </div>
        </div>
    )

        
}
    
 
export default Item;