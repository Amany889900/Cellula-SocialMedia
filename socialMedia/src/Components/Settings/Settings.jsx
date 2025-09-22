import React, { useEffect } from 'react'
import Avatar from "../../assets/Images/ImageAvatar.png"
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getFollowers, getFollowing, getNotifications, getPosts, getUser } from '../../Store/Slices/UserSlice';
function Settings() {
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

  console.log(followers,following,posts);
    const listItems = [
        <div className="flex items-center mb-10">
          <div>
            <p className="font-medium text-[16px] mb-1">Notifications</p>
            <p className="text-[#919191] text-[12px]">See your latest activity</p>
          </div>
          <div className="w-[24px] h-[24px] ms-auto  rounded-full flex justify-center items-center text-white bg-[#34D15C] p-4">{notifications.length}</div>
          <div onClick={()=>{
            navigate("/notifications")
          }} className="ms-auto w-[36px] h-[36px] cursor-pointer rounded-full border-2 border-[#EEEEEE] flex justify-center items-center"><i className="fa-solid fa-chevron-right text-[#919191]"></i></div>
       </div>
            ,
               <div className="flex items-center mb-10">
          <div>
            <p className="font-medium text-[16px] mb-1">Friends</p>
            <p className="text-[#919191] text-[12px]">Friendlist totals</p>
          </div>
          <div className="ms-auto w-[36px] h-[36px] rounded-full border-2 border-[#EEEEEE] flex justify-center items-center"><i className="fa-solid fa-chevron-right text-[#919191]"></i></div>
       </div>
            ,
               <div className="flex items-center mb-10">
          <div>
            <p className="font-medium text-[16px] mb-1">Messages</p>
            <p className="text-[#919191] text-[12px]">Message your friends</p>
          </div>
          <div className="w-[24px] h-[24px] ms-auto  rounded-full flex justify-center items-center text-white bg-[#34D15C] p-4">2</div>
          <div className="ms-auto w-[36px] h-[36px] rounded-full border-2 border-[#EEEEEE] flex justify-center items-center"><i className="fa-solid fa-chevron-right text-[#919191]"></i></div>
       </div>
            ,
               <div className="flex items-center mb-10"> 
          <div>
            <p className="font-medium text-[16px] mb-1">Albums</p>
            <p className="text-[#919191] text-[12px]">Save or post your albums</p>
          </div>
          <div className="ms-auto w-[36px] h-[36px] rounded-full border-2 border-[#EEEEEE] flex justify-center items-center"><i className="fa-solid fa-chevron-right text-[#919191]"></i></div>
       </div>
            ,
               <div className="flex items-center mb-10">    
          <div>
            <p className="font-medium text-[16px] mb-1">Favorites</p>
            <p className="text-[#919191] text-[12px]">Friends you love</p>
          </div>
          <div className="ms-auto w-[36px] h-[36px] rounded-full border-2 border-[#EEEEEE] flex justify-center items-center"><i className="fa-solid fa-chevron-right text-[#919191]"></i></div>
       </div>
            ,
               <div className="flex items-center mb-10">
          <div>
            <p className="font-medium text-[16px] mb-1">Privacy Policy</p>
            <p className="text-[#919191] text-[12px]">Protect your privacy</p>
          </div>
          <div className="ms-auto w-[36px] h-[36px] rounded-full border-2 border-[#EEEEEE] flex justify-center items-center"><i className="fa-solid fa-chevron-right text-[#919191]"></i></div>
       </div>
            
            
    ]
  return (
   <>
     <div className="mt-15 border-b-2 border-gray-200 pb-5 ">
       <div className="w-[80%] mx-auto flex items-center">
          <div className="w-[55px] h-[55px] rounded-full border-2 border-[#34D15C] p-1 mr-4">
            <img src={Avatar} alt="avatar" className="w-full" />
          </div>
          <div>
            <p className="font-medium text-[16px] mb-1">{user.name}</p>
            <p className="text-[#919191] text-[12px]">{user.userName}</p>
          </div>
          <div onClick={()=>{
            navigate("/profile")
          }} className="ms-auto cursor-pointer w-[36px] h-[36px] rounded-full border-2 border-[#EEEEEE] flex justify-center items-center"><i className="fa-solid fa-chevron-right text-[#919191]"></i></div>
       </div>
    </div>

    <div className="w-[80%] mx-auto">
        <div className="mt-10 flex justify-between">
            <div className="w-1/3 p-5">
            <div className="border-2 py-5 text-center border-[#EEEEEE] rounded-2xl flex justify-center items-center">
                <div>
                    <p className="text-[25px]">{posts.length}</p>
                    <p className="text-[12px] text-[#919191]">Post</p>
                </div>
            </div>
            </div>
            <div className="w-1/3 p-5">
            <div className="border-2 py-5 text-center border-[#EEEEEE] rounded-2xl flex justify-center items-center">
                <div>
                    <p className="text-[25px]">{following.length}</p>
                    <p className="text-[12px] text-[#919191]">Following</p>
                </div>
            </div>
            </div>
            <div className="w-1/3 p-5">
            <div className="border-2 py-5 text-center border-[#EEEEEE] rounded-2xl flex justify-center items-center">
                <div>
                    <p className="text-[25px]">{followers.length}</p>
                    <p className="text-[12px] text-[#919191]">Followers</p>
                </div>
            </div>
            </div>
        </div>

        <ul className="my-10">
           {listItems.map((item,idx)=>(
                <li key={idx}>
                    {item}
                </li>
           ))}
        </ul>

  <button onClick={
    ()=>{
      navigate("/login")
    }
  } className="text-[#28CD56] border-2 border-[#C9FFD5] mb-10 bg-[#F5FFF8] hover:bg-[#22a343] focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-4 text-center lg:w-full">Log out</button>

    </div>
   </>
  )
}

export default Settings