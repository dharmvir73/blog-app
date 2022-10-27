import "./Dashboarditem.css"
import Item from "./items/Item"
import { useEffect, useState } from "react"

const Dashboarditem = ({Items}) => {
    
    var count = 0;
    var totalCount = 0;

    const [views, setViews] = useState(0)

    const totalViews = () => {
            
            Items.map((data)=>{
            
            count = data.data.views
            totalCount = totalCount + count
            const TotalViews = totalCount;

            setViews(TotalViews)
        })
        
    }

    useEffect(()=>{
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