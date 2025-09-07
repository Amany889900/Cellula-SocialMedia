import React, { createContext } from 'react'
import  axios  from 'axios';

export const AuthContext = createContext();

const AuthContextProvider = ({children})=>{
   
    async function login(userData){
        try {
            const {data} = await axios.get("http://127.0.0.1:8000/sign-in",{
            params:{
              ...userData
            }
            })   
            return data //user id
        } catch (error) {
            console.log("error from login fn in Authentication",error);
        }
        
    }

   return (
    <AuthContext.Provider value={
      {
        login
      }

    }>
        {children}
    </AuthContext.Provider>
   )
}

export default  AuthContextProvider