import React from 'react'
import { Route,Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import SignUp from '../pages/signUp/SignUp';
import Login from '../pages/login/Login.jsx';
import PostDetails from '../pages/PostDetails/PostDetails.jsx';
import CreatePost from '../components/posts/CreatePost.jsx';
import PageNotFound from '../components/PageNotFound/PageNotFound.jsx';
import Home from '../pages/Home/Home.jsx';
const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/createpost"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts/:id"
          element={
            <ProtectedRoute>
              <PostDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home/>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;
