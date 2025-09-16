
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getFollowers, getFollowing, getUser } from '../../Store/Slices/UserSlice';
import Avatar from "../../assets/Images/ImageAvatar.png"


function Followers() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const userId = JSON.parse(localStorage.getItem("userId"));
   const { followers,following,posts,notifications,user,loading, error } = useSelector((state) => state.user);
   let followedBack = [];
   let notFollowedBack = [];

    useEffect(() => {
       dispatch(getUser(userId));
     }, [user]);
   
     useEffect(() => {
       dispatch(getFollowers(userId));
     }, [followers.length]);
   
       useEffect(() => {
       dispatch(getFollowing(userId));
     }, [following.length]);

      useEffect(() => {
       for(let i=0; i<followers.length;i++){
          if(following.includes(followers[i])){
            followedBack.push(followers[i]);
          }else{
            notFollowedBack.push(followers[i]);
          }
       }
     }, [following,followers]);
   
    //    useEffect(() => {
    //    dispatch(getPosts(userId));
    //  }, [posts.length]);
   
    //    useEffect(() => {
    //    dispatch(getNotifications(userId));
    //  }, [notifications.length]);

  return (
   <>
    <div className="mt-15 border-b-2 border-gray-200 pb-5 ">
       <div className="w-[80%] mx-auto flex items-center">
          <div onClick={
            ()=>{
                navigate("/settings");
            }
        } className="bg-[#34D15C] p-5 w-[15%] lg:w-[10%] rounded-[4px] flex justify-center items-center cursor-pointer">
           <i className="fa-solid fa-arrow-left text-white"></i>
        </div>
        <h2 className="flex-1 text-center text-3xl font-medium">Followers({followers.length})</h2>
    </div>
    </div>

    {followers.map((follower,idx)=>(
        <div key={idx} className="mt-15 border-b-2 border-gray-200 pb-5 ">
               <div className="w-[80%] mx-auto flex items-center">
                  <div className="w-[55px] h-[55px] rounded-full p-1 mr-4">
                    <img src={Avatar} alt="avatar" className="w-full" />
                  </div>
                  {concole.log()}
                  <div>
                    <p className="font-medium text-[16px] mb-1">{dispatch(getUser(follower.follower_id)).name}</p>
                    <p className="text-[#919191] text-[12px]">{dispatch(getUser(follower.follower_id)).userName}</p>
                  </div>
                  {followedBack.includes(follower)
                  ?<div className="ms-auto cursor-pointer py-3 px-10 bg-white border border-gray-300 rounded-4xl flex justify-center items-center">Following</div>
                  :<div className="ms-auto cursor-pointer py-3 px-10 bg-[#34D15C] text-white rounded-4xl flex justify-center items-center">Follow</div>
                  }
                  </div>
            </div>
    ))}

   </>
  )
}

export default Followers