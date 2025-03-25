import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
// import CreatePost from './components/posts/CreatePost'
// import AddComment from './components/addComments/AddComments'
// import PostsList from './components/posts/GetPosts'
const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
      {/* <AddComment /> */}
      {/* <PostsList/> */}
      {/* <CreatePost/> */}
    </BrowserRouter>
  )
}

export default App;
