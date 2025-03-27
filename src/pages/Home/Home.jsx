import React from 'react'
import PostsList from '../../components/posts/GetPosts'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Home = () => {
  const navigate = useNavigate();
  // console.log("API URL:", import.meta.env.VITE_API_URL);

  
  return (
    <div>
      <div className='flex justify-between'>
        <button
          onClick={() => navigate("/createpost")}
          className="bg-blue-500 text-white px-4 py-2 rounded m-5"
        >
          Create New Post
        </button>
        <button
          onClick={() => { navigate("/"); Cookies.remove("token") }}
          className="bg-blue-500 text-white px-4 py-2 rounded m-5"
        >
          LogOut
        </button>
      </div>
      <PostsList />
    </div>
  );
}

export default Home;
