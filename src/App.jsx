// import React from 'react'
// import { useSelector } from 'react-redux';

// const App = () => {
//   const state = useSelector((state)=>state.counter.value);
//   return (
//     <div className=''>
//       Ali
//       {state}
//     </div>
//   )
// }

// export default App;
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  )
}

export default App;
