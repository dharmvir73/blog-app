import "./Item.css";

const Item = ({Item:{data:{cover}}}) => {

    console.log(cover)
    return (  
    <div className="Posts">
    <img className="image" src={cover} alt="" style={{width: '100%', height: '100%', borderRadius: '5%'}}/>
    </div> );
}
 
export default Item;