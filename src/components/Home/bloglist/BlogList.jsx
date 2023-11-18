import BlogItem from "./blogItems/BlogItem";
import "./BlogList.css";

const BlogList = ({ blogs }) => {
  console.log(blogs);
  return (
    <div className="blogList-wrap">
      {blogs?.map((blog) => (
        <BlogItem blog={blog} key={blog.id} />
      ))}
    </div>
  );
};

export default BlogList;
