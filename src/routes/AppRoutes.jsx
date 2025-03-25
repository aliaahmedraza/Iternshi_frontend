import React from 'react'
import { Route,Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
// import ProtectedRoute from './ProtectedRoute';
import SignUp from '../pages/signUp/SignUp';
import Login from '../pages/login/Login.jsx';
import PostDetails from '../pages/PostDetails/PostDetails.jsx';
const AppRoutes = () => {
  return (
    <div>
          <Routes>
              <Route path="/" element={<Dashboard/>} />
              {/* <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> */}
              <Route path="/postdetails" element={<PostDetails/>}/>
              <Route path="/login" element={<Login/>} />
              <Route path="/signup" element={<SignUp />} />
              {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  )
}

export default AppRoutes;
