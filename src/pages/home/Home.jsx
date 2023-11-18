import BlogList from "../../components/Home/bloglist/BlogList";
import Header from "../../components/Home/header/Header";
import SearchBar from "../../components/Home/searchbar/SearchBar";
import Navbar from "../../components/Common/navbar/Navbar";
import { useState, useEffect, useCallback } from "react";
import { db } from "../../backend/firebase-config";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import spinner from "../../Images/Loding/Spinner.gif";
import "./Home.css";

const Home = () => {
  const [blogPost, setBlogPost] = useState([]);

  const [searchKey, setSearchKey] = useState("");

  const blogPostCollectionRef = collection(db, "blogs-post");

  const getBlogPost = useCallback(async () => {
    const data = await getDocs(blogPostCollectionRef);
    setBlogPost(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }, [blogPostCollectionRef]);

  useEffect(() => {
    if (!searchKey) {
      getBlogPost();
    }
  }, [searchKey, getBlogPost]);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const blogsInstance = await getDocs(blogPostCollectionRef);
    const blogs = blogsInstance.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const filteredBlogs = blogs.filter((blog) =>
      blog?.title
        ?.trim()
        ?.toLowerCase()
        .includes(searchKey?.trim()?.toLowerCase())
    );
    setBlogPost(filteredBlogs);
  };

  const Loader = () => {
    <></>;
  };

  setTimeout(() => {
    Loader();
  }, 1000);

  return (
    <div>
      {/* Navbar  */}

      <Navbar type="Home" />

      {/*page header*/}

      <Header />

      {/*search bar*/}

      <SearchBar
        value={searchKey}
        formSubmit={handleSearchSubmit}
        handleSearchKey={(e) => setSearchKey(e.target.value)}
      />

      {/*empty list*/}

      {blogPost.length === 0 ? (
        <>
          <img
            src={spinner}
            alt=""
            height="80px"
            width="80px"
            style={{
              marginTop: "5%",
              marginLeft: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </>
      ) : (
        <BlogList blogs={blogPost} />
      )}
    </div>
  );
};
export default Home;
