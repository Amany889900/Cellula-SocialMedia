
import Avatar from "../../assets/Images/ImageAvatar.png"

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deletePostLike,
  deletePostShare,
  getAllPostsWithUserData,
  likePost,
  sharePost,
} from "./../../Store/Slices/PostSlice";
import { deleteCommentLike, getAllPostCommentsWithUserData, likeComment } from "../../Store/Slices/CommentSlice";

function PostDetails() {
  const dispatch = useDispatch();
  const { post_id } = useParams();
  const userId = JSON.parse(localStorage.getItem("userId"));
  const navigate = useNavigate()

  const { allPostsWithUserData, userSharedPosts, userLikedPosts } = useSelector(
    (state) => state.post
  );

   const {allPostCommentsWithUserData,userLikedComments} = useSelector(
    (state) => state.comment
  );
  const [post, setPost] = useState(null);

  
  useEffect(() => {
    if (allPostsWithUserData.length === 0) {
      dispatch(getAllPostsWithUserData());
    }
  }, [dispatch, allPostsWithUserData.length]);

   useEffect(() => {
          dispatch(getAllPostCommentsWithUserData(post_id));
        }, [dispatch,allPostCommentsWithUserData.length]);

 
  useEffect(() => {
    if (allPostsWithUserData.length > 0) {
      const foundPost = allPostsWithUserData.find(
        (p) => String(p.id) === String(post_id)
      );
      setPost(foundPost || null);
    }
  }, [allPostsWithUserData, post_id]);

  // toggle share
  const handleToggleShare = (postId, isShared) => {
    if (isShared) {
      dispatch(deletePostShare({ user_id: userId, post_id: postId }));
    } else {
      dispatch(sharePost({ user_id: userId, post_id: postId }));
    }
  };

  // toggle like
  const handleToggleLike = (postId, isLiked) => {
    if (isLiked) {
      dispatch(deletePostLike({ user_id: userId, post_id: postId }));
    } else {
      dispatch(likePost({ user_id: userId, post_id: postId }));
    }
  };


    // toggle like
  const handleToggleLikeComment = (commentId,comment_user_id,isLiked) => {
    if (isLiked) {
      dispatch(deleteCommentLike({ user_id: userId,comment_id:commentId,comment_user_id, post_id}));
    } else {
      dispatch(likeComment({ user_id: userId,comment_id:commentId,comment_user_id, post_id}));
    }
  };
  // check if user liked/shared
  const isShared = post
    ? userSharedPosts.some((p) => p.id === post.id)
    : false;
  const isLiked = post ? userLikedPosts.some((p) => p.id === post.id) : false;
 

 
  if (!post) {
    return <p className="text-center mt-10">Loading post...</p>;
  }

  return (
    <>

    <div className="w-[80%] mx-auto mt-10">
          <div onClick={
            ()=>{
                navigate("/timeline");
            }
        } className="bg-[#34D15C] p-5 w-[15%] lg:w-[10%] rounded-[4px] flex justify-center items-center cursor-pointer">
           <i className="fa-solid fa-arrow-left text-white"></i>
        </div>
        

       </div>
    
      <div className="w-[80%] mx-auto mt-20">{post.text}</div>

      <div className="flex justify-between w-[80%] mx-auto mt-30">
        {/* share */}
        <div>
          {isShared ? (
            <i
              onClick={() => handleToggleShare(post.id, true)}
              className="fa-solid fa-share-nodes text-cyan-700 text-2xl cursor-pointer"
            ></i>
          ) : (
            <i
              onClick={() => handleToggleShare(post.id, false)}
              className="fa-solid fa-share-nodes text-2xl cursor-pointer"
            ></i>
          )}
          <span className="text-[18px]">{post.shares_count}</span>
        </div>

        {/* like + comments */}
        <div>
          {isLiked ? (
            <i
              onClick={() => handleToggleLike(post.id, true)}
              className="fa-solid fa-heart text-2xl cursor-pointer text-red-700"
            ></i>
          ) : (
            <i
              onClick={() => handleToggleLike(post.id, false)}
              className="fa-solid fa-heart text-2xl cursor-pointer"
            ></i>
          )}
          <span className="text-[18px]">{post.likes_count}</span>

          <i className="fa-solid fa-comment-dots text-2xl ms-5 cursor-pointer"></i>
          <span className="text-[18px]">{post.comments_count}</span>
        </div>
        
      </div>

      {allPostCommentsWithUserData.map((comment,idx)=>{
         const isLikedComment = userLikedComments.some((c) => c.id === comment.id);
            return( 
              <div  key={idx}>
                <div className="w-[80%] mx-auto flex items-center mt-10">
                                            <div className="w-[55px] h-[55px] rounded-full border-2 border-[#34D15C] p-1 mr-4">
                                              <img src={Avatar} alt="avatar" className="w-full" />
                                            </div>
                                            <div>
                                              <p className="font-medium text-[16px] mb-1">{comment.user.name}</p>
                                              <p className="text-[#919191] text-[12px]">52 minutes ago</p>
                                            </div>
                                            {comment.user.id == userId?"":isLikedComment?<i onClick={()=>{
                                                handleToggleLikeComment(comment.id,comment.user.id,true) 
                                            }} className="fa-solid fa-heart text-red-600 cursor-pointer ms-auto text-2xl"></i>:<i onClick={()=>{
                                                handleToggleLikeComment(comment.id,comment.user.id,false) 
                                            }} className="fa-solid fa-heart cursor-pointer ms-auto text-2xl"></i>}
                                         </div>
                                         <div className="w-[80%] mx-auto mt-10">{comment.text}</div>
              </div>
                                         
            )
        })}
    </>
  );
}

export default PostDetails;
