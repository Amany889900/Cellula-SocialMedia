import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { createHashRouter, RouterProvider} from "react-router"
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
import Settings from './Components/Settings/Settings'

function App() {
  
  const router = createHashRouter([
    {path:"",element:<Home/>},
    {path:"/login",element:<Login/>},
    {path:"/settings",element:<Settings/>},
  ]);
  return (
    <>
    
      <RouterProvider router={router} />
    </>
  )
}

export default App
