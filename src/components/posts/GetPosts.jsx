import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import UpdatePost from "./UpdatePost";
const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("https://internship-task-blogapp-1.onrender.com/api/posts/");
        setPosts(response.data);
      } catch (err) {
       console.log ("Error fetcing Posts", err)
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="flex justify-center items-center"><Loader/></div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link to={`/posts/${post._id}`} key={post._id}>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">
                Title: {post?.title || "Untitled"}
              </h2>
              <p className="text-gray-700 mb-2">
                Content:{post?.content || "No content available."}
              </p>
              <div className="text-sm text-gray-500 mb-2">
                <strong>Author:</strong> {post.author?.name || "Unknown"}
              </div>
                    <h1 className="mb-4 text-lg font-semibold text-gray-800">
  Created At: {post?.createdAt ? new Date(post.createdAt).toLocaleString() : 'Date not available'}
</h1>
            </div>
            <UpdatePost/>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PostsList;


