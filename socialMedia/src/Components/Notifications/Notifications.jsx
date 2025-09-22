import React, { useEffect, useState } from 'react'
import Avatar from "../../assets/Images/ImageAvatar.png"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFollowers, getFollowing, getNotifications, getPosts, getUser } from '../../Store/Slices/UserSlice';


function Notifications() {
const navigate = useNavigate();
    const dispatch = useDispatch();
    const { followers,following,posts,notifications,user,loading, error } = useSelector((state) => state.user);

    const userId = JSON.parse(localStorage.getItem("userId"))
  
   useEffect(() => {
    dispatch(getUser(userId));
  }, [userId]);

  useEffect(() => {
    dispatch(getFollowers(userId));
  }, [followers.length]);

    useEffect(() => {
    dispatch(getFollowing(userId));
  }, [following.length]);

    useEffect(() => {
    dispatch(getPosts(userId));
  }, [posts.length]);

    useEffect(() => {
    dispatch(getNotifications(userId));
  }, [notifications.length]);

  function fetchNotificationDetails(){
    let notificationDetails = [];
    for (const notification of notifications) {
        
    }
  }

  return (
   <>
      <div className="mt-15 border-b-2 border-gray-200 pb-5 ">
            <div className="w-[80%] mx-auto flex items-center">
               <div className="w-[55px] h-[55px] rounded-full border-2 border-[#34D15C] p-1 mr-4">
                 <img src={Avatar} alt="avatar" className="w-full" />
               </div>
               <div className="ms-auto cursor-pointer w-[36px] h-[36px] rounded-full border-2 border-[#EEEEEE] flex justify-center items-center"><i className="fa-solid fa-magnifying-glass"></i></div>
            
        </div>

        <div className="w-[80%] mx-auto flex items-center ">
         
            <p className="font-medium text-[16px] mt-4 ">Notifications</p>
          <div className="w-[24px] h-[24px] ms-5 mt-4 rounded-full flex justify-center items-center text-white bg-[#34D15C] p-4">{notifications.length}</div>
        </div>
            
         </div>
   </>
  )
}

export default Notifications