
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { follow, getFollowers, getFollowing, getUser, unfollow } from '../../Store/Slices/UserSlice';
import Avatar from "../../assets/Images/ImageAvatar.png"
import axios from 'axios';


function Followers() {
  const [followerDetails, setFollowerDetails] = useState({});


   const navigate = useNavigate();
   const dispatch = useDispatch();
   const userId = JSON.parse(localStorage.getItem("userId"));
   const {followers,following,posts,notifications,user,loading, error} = useSelector((state) => state.user);
   const [followedBack, setFollowedBack] = useState([]);
   const [notFollowedBack, setNotFollowedBack] = useState([]);

    useEffect(() => {
       dispatch(getUser(userId));
     }, []);
   
     useEffect(() => {
       dispatch(getFollowers(userId));
     }, [followers.length]);
   
       useEffect(() => {
       dispatch(getFollowing(userId));
     }, [following.length]);

      useEffect(() => {
         const fb = [];
         const nfb = [];

    for (let i = 0; i < followers.length; i++) {
    const followerId = followers[i].follower_id;

    if (following.some(f => f.following_id === followerId)) {
      fb.push(followerId);
    } else {
      nfb.push(followerId);
    }
  }

  setFollowedBack(fb);
  setNotFollowedBack(nfb);
}, [followers, following]);

  useEffect(() => {
  const fetchDetails = async () => {
    const details = {};
    for (let f of followers) {
      try {
      const response = await axios.get("http://127.0.0.1:8000/get-user_data", {
        params: { user_id:f.follower_id },
      });
      details[f.follower_id] = response.data[0];
    } catch (error) {
      console.log("Error...........",error);
    }
    }
    setFollowerDetails(details);
  };
  if (followers.length) fetchDetails();
}, [followers]);

console.log(followers,following,followedBack,notFollowedBack);


   
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
        <div key={idx} onClick={
          ()=>{
            navigate(`/followerDetails/${follower.follower_id}`)
          }
        } className="mt-15 border-b-2 border-gray-200 pb-5 cursor-pointer">
               <div className="w-[80%] mx-auto flex items-center">
                  <div className="w-[55px] h-[55px] rounded-full p-1 mr-4">
                    <img src={Avatar} alt="avatar" className="w-full" />
                  </div>
                  {console.log(follower)}
                  <div>
                    <p className="font-medium text-[16px] mb-1">{followerDetails[follower.follower_id]?.name }</p>
                    <p className="text-[#919191] text-[12px]">{"@"+followerDetails[follower.follower_id]?.name.split(" ").join(".") }</p>
                  </div>
                  {followedBack.includes(follower.follower_id)
                  ?<div onClick={(e)=>{
                    e.preventDefault();
                     e.stopPropagation();
                    dispatch(unfollow({sender_id:userId,receiver_id:follower.follower_id}))
                  }} className="ms-auto cursor-pointer py-3 px-10 bg-white border border-gray-300 rounded-4xl flex justify-center items-center">Following</div>
                  :<div onClick={(e)=>{
                    e.preventDefault();
                     e.stopPropagation();
                    dispatch(follow({sender_id:userId,receiver_id:follower.follower_id}))
                  }} className="ms-auto cursor-pointer py-3 px-10 bg-[#34D15C] text-white rounded-4xl flex justify-center items-center">Follow</div>
                  }
                  </div>
            </div>
    ))}

   </>
  )
}

export default Followers