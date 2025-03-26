import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      <div className="bg-cyan-700 h-28 flex justify-between items-center gap-2 p-5">
        <div>
          <h1 className="font-extrabold text-4xl">Blog App</h1>
        </div>
        <div>
          <button
            onClick={() => navigate("/login")}
            className="bg-black text-white px-4 py-2 mr-3 rounded"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Register
          </button>
        </div>
      </div>
      <div className="text-center p-6">
        <h2 className="text-xl font-semibold mb-4">Welcome to the Blog App</h2>
        <p className="text-gray-700 mb-4">
          Please register or log in to create, like, and comment on posts.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
