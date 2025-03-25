import React,{ useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/slices/blogPostSlice.js";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { items: posts, status, error } = useSelector((state) => state.posts);

  useEffect(() => {
    if (status === "idle") dispatch(fetchPosts());
  }, [status, dispatch]);

  if (error) return <p>Error: {error}</p>;
  if (status === "loading") return <p>Loading...</p>;

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts?.map((post) => (
        <div key={post?._id}>
          <h2>{post?.title}</h2>
          <p>{post?.content?.substring(0, 100)}...</p>
          {/* <Link to={`/post/${post?._id}`}>Read More</Link> */}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
