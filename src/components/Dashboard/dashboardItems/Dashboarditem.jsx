import "./Dashboarditem.css"
import Item from "./items/Item"
import { useEffect, useState, useRef} from "react"


const Dashboarditem = ({Items}) => {
    
    var count = 0;
    var totalCount = 0;
    const dataFetchedRef = useRef(false);

    const [views, setViews] = useState()

    const totalViews = () => {
       
            Items.map((item)=>{
            
            count = item.data.views
            totalCount = totalCount + count
            const TotalViews = totalCount;

            setViews(TotalViews)

            console.log(totalCount)
            
        })
        
    }

    useEffect(()=>{
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        totalViews()
    },[Items])

    return ( 
    <div className="Wrapper">

          <div className="TopInfo">
                <div className="Title">Dashboard</div>
                <div className="TotalViews">{views} Total Views</div>
            </div>
            <div className="PostWrapper">
            {Items.map((Items)=>(
                <Item Items={Items}
                key={Items.id}
                 />
            ))}
            </div>
        
    </div> );
}
 
export default Dashboarditem;