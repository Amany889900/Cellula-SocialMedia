import React, { useEffect } from 'react'
import Avatar from "../../assets/Images/ImageAvatar.png"
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getFollowers, getFollowing, getNotifications, getPosts, getUser } from '../../Store/Slices/UserSlice';
function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { followers,following,posts,user,loading, error } = useSelector((state) => state.user);

  const userId = JSON.parse(localStorage.getItem("userId"))
  
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
    dispatch(getPosts(userId));
  }, [posts.length]);

//     useEffect(() => {
//     dispatch(getNotifications(userId));
//   }, [notifications.length]);

  console.log(followers,following,posts);
   
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
        <h2 className="flex-1 text-center text-3xl font-medium">Profile</h2> 
        <i className="fa-solid fa-heart text-2xl md:text-3xl md:mr-10"></i>
        <i className="fa-solid fa-magnifying-glass text-2xl md:text-3xl"></i>

       </div>
    </div>
    <div  className="w-[80%] mx-auto mt-15 ">
        <div className="flex flex-col items-center">
            <div className="w-[150px] h-[150px] rounded-full border-2 border-[#34D15C] p-1 ">
                <img src={Avatar} alt="avatar" className="w-full" />
              </div>
              <div>
                <p className="font-medium text-[16px] mb-1">{user.name}</p>
                <p className="text-[#919191] text-[12px]">{user.userName}</p>
         </div>
           <button onClick={()=>{navigate("/editProfile")}} className="text-white cursor-pointer bg-[#34D15C] hover:bg-[#22a343] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-4 text-center lg:w-[35%] mt-10">Edit profile</button>
        </div>
     
    </div>

     <div className="border-b-2 border-gray-200 pb-5">
            <div className="w-[80%] mx-auto mt-10 flex justify-between">
            <div className="w-1/3 pr-5">
            <div className="border-2 py-5 text-center border-[#EEEEEE] rounded-2xl flex justify-center items-center">
                <div>
                    <p className="text-[25px]">{posts.length}</p>
                    <p className="text-[12px] text-[#919191]">Post</p>
                </div>
            </div>
            </div>
            <div className="w-1/3 px-5">
            <div className="border-2 py-5 text-center border-[#EEEEEE] rounded-2xl flex justify-center items-center">
                <div>
                    <p className="text-[25px]">{following.length}</p>
                    <p className="text-[12px] text-[#919191]">Following</p>
                </div>
            </div>
            </div>
            <div className="w-1/3 pl-5">
            <div className="border-2 py-5 text-center border-[#EEEEEE] rounded-2xl flex justify-center items-center">
                <div>
                    <p className="text-[25px]">{followers.length}</p>
                    <p className="text-[12px] text-[#919191]">Followers</p>
                </div>
            </div>
            </div>
        </div>
        </div>

   </>
  )
}

export default Profile