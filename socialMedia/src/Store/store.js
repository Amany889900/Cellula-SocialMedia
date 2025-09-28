
import { configureStore } from "@reduxjs/toolkit";
import userSlice  from "./Slices/UserSlice";
import postSlice  from "./Slices/PostSlice";



export const store = configureStore({
   reducer:{
     user:userSlice,
     post:postSlice
   }
})