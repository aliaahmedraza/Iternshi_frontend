import React from 'react'
import PostsList from '../../components/posts/GetPosts'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
  return (
    <div>
      <div>
        <button
          onClick={() => navigate("/createpost")}
          className="bg-blue-500 text-white px-4 py-2 rounded m-5"
        >
          Create New Post
        </button>
      </div>
      <PostsList />
    </div>
  );
}

export default Home;
