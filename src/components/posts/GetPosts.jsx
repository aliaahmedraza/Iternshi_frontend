import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = Cookies.get("token");
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3004/api/posts/");
        setPosts(response.data);
      } catch (err) {
        setError(err.message || "Error fetching posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link to={`/posts/${post._id}`} key={post._id}>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-2">
                {post?.title || "Untitled"}
              </h2>
              <p className="text-gray-700 mb-2">
                {post?.content || "No content available."}
              </p>
              <div className="text-sm text-gray-500 mb-2">
                <strong>Author:</strong> {post.author?.name || "Unknown"}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PostsList;


