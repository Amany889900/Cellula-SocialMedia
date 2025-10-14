import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { follow, getFollowers, getFollowing, getUser, unfollow } from '../../Store/Slices/UserSlice';
import Avatar from "../../assets/Images/ImageAvatar.png"
import axios from 'axios';
import { deletePostLike, deletePostShare, getAllPostsWithUserData, getUserSharedPosts, likePost, sharePost } from './../../Store/Slices/PostSlice';
import { createComment } from '../../Store/Slices/CommentSlice';


function Timeline() {
      const navigate = useNavigate();
      const dispatch = useDispatch();
      const userId = JSON.parse(localStorage.getItem("userId"));
      const {followers, following} = useSelector((state) => state.user);
      const {allPostsWithUserData,userSharedPosts,userLikedPosts} = useSelector((state) => state.post);
      const [commentTexts, setCommentTexts] = useState({});
      const [expandedPosts, setExpandedPosts] = useState({}); // {postId: true/false}

const toggleExpand = (postId) => {
  setExpandedPosts(prev => ({
    ...prev,
    [postId]: !prev[postId]
  }));
};

      
      // Load user and followers/following
      useEffect(() => {
        dispatch(getUser(userId));
        dispatch(getFollowers(userId));
        dispatch(getFollowing(userId));
      }, [dispatch,userId]);

        useEffect(() => {
        dispatch(getAllPostsWithUserData());
      }, [dispatch,allPostsWithUserData.length]);

        useEffect(() => {
        dispatch(getUserSharedPosts(userId));
      }, [dispatch,userSharedPosts.length]);

  

 const handleToggleFollow = (followerId, isFollowing) => {
  if (isFollowing) {
    dispatch(unfollow({ sender_id: userId, receiver_id: followerId }));
  } else {
    dispatch(follow({ sender_id: userId, receiver_id: followerId }));
  }
};

 const handleToggleShare = (postId,isShared) => {
  if (isShared) {
    dispatch(deletePostShare({ user_id: userId, post_id: postId }));

  } else {
    dispatch(sharePost({ user_id: userId, post_id: postId }));

  }
};

 const handleToggleLike = (postId,isLiked) => {
  if (isLiked) {
    dispatch(deletePostLike({ user_id: userId, post_id: postId }));

  } else {
    dispatch(likePost({ user_id: userId, post_id: postId }));

  }
};

const handleSendComment = (postId) => {
  const comment = commentTexts[postId]?.trim();
  if (!comment) return;

  dispatch(createComment({ user_id: userId, post_id: postId, content: comment }));

  setCommentTexts(prev => ({ ...prev, [postId]: "" }));
  setExpandedPosts(prev => ({ ...prev, [postId]: false }));
};



  return (
    <>
      <div className="mt-15 border-b-2 border-gray-200 pb-5 ">
                  <div className="w-[80%] mx-auto flex items-center">

                      <i className="fa-solid text-4xl fa-camera"></i>
                  
                     <div className="ms-auto cursor-pointer w-[36px] h-[36px] rounded-full border-2 border-[#EEEEEE] flex justify-center items-center"><i className="fa-solid fa-magnifying-glass"></i></div>
                  
              </div>
      
              <div className="w-[80%] mx-auto flex items-center ">
               
                  <p className="font-medium text-[18px] mt-4 ">Timeline</p>

              </div>   
               </div>
{allPostsWithUserData.map((post,idx)=>{
     const isFollowing = following.some(f => f.following_id === post.user_id);
     const isShared = userSharedPosts.some(p => p.id === post.id);
     const isLiked = userLikedPosts.some(p => p.id === post.id);

     return(<div key={idx} onClick={()=>{navigate(`/postDetails/${post.id}`)}}  className="mt-15 border-b-2 border-gray-200 pb-5 cursor-pointer">
                     <div className="w-[80%] mx-auto flex items-center">
                              <div className="w-[55px] h-[55px] rounded-full border-2 border-[#34D15C] p-1 mr-4">
                                <img src={Avatar} alt="avatar" className="w-full" />
                              </div>
                              <div>
                                <p className="font-medium text-[16px] mb-1">{post.user.name}</p>
                                <p className="text-[#919191] text-[12px]">52 minutes ago</p>
                              </div>
                              {isFollowing ? (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleToggleFollow(post.user_id, true);
                  }}
                  className="ms-auto cursor-pointer py-3 px-10 bg-white border border-gray-300 rounded-4xl flex justify-center items-center"
                >
                  Following
                </div>
              ) : (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleToggleFollow(post.user_id, false);
                  }}
                  className="ms-auto cursor-pointer py-3 px-10 bg-[#34D15C] text-white rounded-4xl flex justify-center items-center"
                >
                  Follow
                </div>
              )}
                           </div>
                           <div className="w-[80%] mx-auto mt-20">{post.text}</div>
                <div className="flex justify-between w-[80%] mx-auto mt-30">
                    <div>{isShared?<i onClick={(e)=>{e.preventDefault();e.stopPropagation();handleToggleShare(post.id,true)}} className="fa-solid fa-share-nodes text-cyan-700 text-2xl cursor-pointer"></i>:<i onClick={(e)=>{e.preventDefault();e.stopPropagation();handleToggleShare(post.id,false)}} className="fa-solid fa-share-nodes text-2xl cursor-pointer"></i>} <span className="text-[18px]">{post.shares_count}</span></div>
                    <div>
                      {isLiked?<i onClick={(e)=>{e.preventDefault();e.stopPropagation();handleToggleLike(post.id,true)}} className="fa-solid fa-heart text-2xl cursor-pointer text-red-700"></i>:<i onClick={(e)=>{e.preventDefault();e.stopPropagation();handleToggleLike(post.id,false)}} className="fa-solid fa-heart text-2xl cursor-pointer"></i>}   <span className="text-[18px]">{post.likes_count}</span>
                        <i  onClick={(e) =>{e.preventDefault();e.stopPropagation();toggleExpand(post.id)}}   className="fa-solid fa-comment-dots text-2xl ms-5 cursor-pointer"></i><span className="text-[18px]">{post.comments_count}</span>
                    </div>
                    
                </div>
                {expandedPosts[post.id]? <div className="w-[80%] mx-auto flex items-center mt-10">
          <input
          onClick={(e)=>{e.preventDefault(); e.stopPropagation()}}
            value={commentTexts[post.id] || ""}   // controlled input
            onChange={(e) =>
              setCommentTexts(prev => ({ ...prev, [post.id]: e.target.value }))
            }
            className="flex-1 border rounded-full border-gray-400 p-3"
            placeholder="Add a comment..."
            type="text"
          />
          <button
            onClick={()=>{handleSendComment(post.id)}}
            className="ml-3 cursor-pointer w-[42px] h-[42px] text-white rounded-full bg-[#34D15C] flex justify-center items-center"
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>:""}
               
                 </div>
)})}
                
    </>
  )
}

export default Timeline