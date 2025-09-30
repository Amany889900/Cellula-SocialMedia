
import { configureStore } from "@reduxjs/toolkit";
import userSlice  from "./Slices/UserSlice";
import postSlice  from "./Slices/PostSlice";
import commentSlice from './Slices/CommentSlice';



export const store = configureStore({
   reducer:{
     user:userSlice,
     post:postSlice,
     comment:commentSlice
   }
})