import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import toast, { Toaster } from 'react-hot-toast';

import { createHashRouter, RouterProvider} from "react-router"
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
import Settings from './Components/Settings/Settings'
import Register from './Components/Register/Register';
import Profile from './Components/Profile/Profile';
import EditProfile from './Components/EditProfile/EditProfile';

function App() {
  
  const router = createHashRouter([
    {path:"",element:<Home/>},
    {path:"/login",element:<Login/>},
    {path:"/settings",element:<Settings/>},
    {path:"/register",element:<Register/>},
    {path:"/profile",element:<Profile/>},
    {path:"/editProfile",element:<EditProfile/>},
  ]);
  return (
    <>
    
      <RouterProvider router={router} />
      <Toaster position="top-right"
      reverseOrder={false}/>
    </>
  )
}

export default App
