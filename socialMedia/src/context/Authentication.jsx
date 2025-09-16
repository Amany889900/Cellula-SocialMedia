import React, { createContext } from 'react'
import  axios  from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();



const AuthContextProvider = ({children})=>{
  
   
    async function login(userData){
     
        try {
            const {data} = await axios.get("http://127.0.0.1:8000/sign-in",{
            params:{
              ...userData
            }
            })   
            toast.success('Logged in Successfully');
            localStorage.setItem("userId",JSON.stringify(data)) // store userId
            return data;
        } catch (error) {
            toast.error("Login failed due to invalid credentials");
            console.log("error from login fn in Authentication",error);
        }
        
    }

       async function registerUser(userData){
     
        try {
            const {data} = await axios.post("http://127.0.0.1:8000/sign-up",null,{
                params:userData
            })   
            toast.success('Registered Successfully');
            return data;
        } catch (error) {
            toast.error("Registration failed email already exists");
            console.log("error from register fn in Authentication",error);
        }
        
    }

   return (
    <AuthContext.Provider value={
      {
        login,
        registerUser
      }

    }>
        {children}
    </AuthContext.Provider>
   )
}

export default  AuthContextProvider