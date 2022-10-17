import BlogList from "../../components/Home/bloglist/BlogList"
import Header from "../../components/Home/header/Header"
import SearchBar from "../../components/Home/searchbar/SearchBar"
import Navbar from "../../components/Common/navbar/Navbar"
import {useState, useEffect} from "react"
import {db} from "../../backend/firebase-config"
import {collection, getDocs} from "firebase/firestore"
import "./Home.css"
const Home = () => {

    const [blogPost, setBlogPost] = useState([])

    const blogPostCollectionRef = collection(db, "blogs-post")

    useEffect(() => {

        const getBlogPost = async () => {
            
            const data = await getDocs(blogPostCollectionRef)

            setBlogPost(data.docs.map((doc) => ({...doc.data(), id: doc.id })))
        }
        getBlogPost();

    }, [])

    return ( 
        <div>
            {/* Navbar  */}

            <Navbar />

            {/*page header*/}

            <Header />

            {/*search bar*/}

            <SearchBar />

            {/*empty list*/}

            <BlogList blogs={blogPost} />

        </div>
     );
}
export default Home;