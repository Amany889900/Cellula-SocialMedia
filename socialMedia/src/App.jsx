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
import Followers from './Components/Followers/Followers';
import FollowerDetails from './Components/FollowerDetails/FollowerDetails';
import Chat from './Components/Chat/Chat';
import Notifications from './Components/Notifications/Notifications';

function App() {
  
  const router = createHashRouter([
    {path:"",element:<Home/>},
    {path:"/login",element:<Login/>},
    {path:"/settings",element:<Settings/>},
    {path:"/register",element:<Register/>},
    {path:"/profile",element:<Profile/>},
    {path:"/editProfile",element:<EditProfile/>},
    {path:"/followers",element:<Followers/>},
    {path:"/chat/:follower_id",element:<Chat/>},
    {path:"/notifications",element:<Notifications/>},
    {path:"/followerDetails/:follower_id",element:<FollowerDetails/>},
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
