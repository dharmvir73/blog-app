import BlogList from "../../components/Home/bloglist/BlogList"
import Header from "../../components/Home/header/Header"
import SearchBar from "../../components/Home/searchbar/SearchBar"
import Navbar from "../../components/Common/navbar/Navbar"
import {useState, useEffect} from "react"
import {db} from "../../backend/firebase-config"
import {collection, getDocs, query, where} from "firebase/firestore"
import spinner from "../../Images/Loding/Spinner.gif"
import "./Home.css"

const Home = () => {

    let searchResults = []

    const [blogPost, setBlogPost] = useState([])

    const [searchKey, setSearchKey] = useState("")

    const blogPostCollectionRef = collection(db, "blogs-post")

    const getBlogPost = async () => {
            
        const data = await getDocs(blogPostCollectionRef)

        setBlogPost(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
    }

    useEffect(() => {

        getBlogPost();

    }, [])

    const handleSearchSubmit = async (e) => {
        e.preventDefault()

        const condition = where("category", "==", searchKey)

        const q = query(collection(db, "blogs-post"), condition)

        const querySnapshot = await getDocs(q)

        querySnapshot.forEach((doc) => {

            searchResults.push({...doc.data(), id: doc.id })

            setBlogPost(searchResults)

        })


    }

    const Loader = () => {
        <></>
        
    }

    setTimeout(() =>{
        Loader()
    },1000)

    return ( 
        <div>
            {/* Navbar  */}

            <Navbar />

            {/*page header*/}

            <Header />

            {/*search bar*/}

            <SearchBar value={searchKey} formSubmit={handleSearchSubmit} handleSearchKey={(e) => setSearchKey(e.target.value)}/>

            {/*empty list*/}

            {blogPost.length === 0 ? <>
            <img src={spinner} alt="" height="80px" width="80px" style={{marginTop:"5%", marginLeft:"50%", transform: "translate(-50%, -50%)"}}/>
            </>
            :
            <BlogList blogs={blogPost} />}

        </div>
     );
}
export default Home;