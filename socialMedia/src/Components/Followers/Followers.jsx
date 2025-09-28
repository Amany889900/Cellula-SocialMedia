import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { follow, getFollowers, getFollowing, getUser, unfollow } from '../../Store/Slices/UserSlice';
import Avatar from "../../assets/Images/ImageAvatar.png"
import axios from 'axios';

function Followers() {
  const [followerDetails, setFollowerDetails] = useState({});
  // const [localFollowing, setLocalFollowing] = useState([]); // ✅ local state Optimistic update

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = JSON.parse(localStorage.getItem("userId"));
  const { followers, following} = useSelector((state) => state.user);

  // Load user and followers/following
  useEffect(() => {
    dispatch(getUser(userId));
    dispatch(getFollowers(userId));
    dispatch(getFollowing(userId));
  }, [dispatch, userId]);

  // // Sync localFollowing with redux following
  // useEffect(() => {
  //   setLocalFollowing(following.map(f => f.following_id));
  // }, [following]);

  // Fetch details of followers
  useEffect(() => {
    const fetchDetails = async () => {
      const details = {};
      for (let f of followers) {
        try {
          const response = await axios.get("http://127.0.0.1:8000/get-user_data", {
            params: { user_id: f.follower_id },
          });
          details[f.follower_id] = response.data[0];
        } catch (error) {
          console.log("Error fetching follower details:", error);
        }
      }
      setFollowerDetails(details);
    };
    if (followers.length) fetchDetails();
  }, [followers]);

 const handleToggleFollow = (followerId, isFollowing) => {
  if (isFollowing) {
    dispatch(unfollow({ sender_id: userId, receiver_id: followerId }));
  } else {
    dispatch(follow({ sender_id: userId, receiver_id: followerId }));
  }
};


  return (
    <>
      <div className="mt-15 border-b-2 border-gray-200 pb-5 ">
        <div className="w-[80%] mx-auto flex items-center">
          <div
            onClick={() => navigate("/settings")}
            className="bg-[#34D15C] p-5 w-[15%] lg:w-[10%] rounded-[4px] flex justify-center items-center cursor-pointer"
          >
            <i className="fa-solid fa-arrow-left text-white"></i>
          </div>
          <h2 className="flex-1 text-center text-3xl font-medium">
            Followers({followers.length})
          </h2>
        </div>
      </div>

      {followers.map((follower, idx) => {
        const followerId = follower.follower_id;
        const isFollowing = following.some(f => f.following_id === followerId);


        return (
          <div
            key={idx}
            onClick={() => navigate(`/followerDetails/${followerId}`)}
            className="mt-15 border-b-2 border-gray-200 pb-5 cursor-pointer"
          >
            <div className="w-[80%] mx-auto flex items-center">
              <div className="w-[55px] h-[55px] rounded-full p-1 mr-4">
                <img src={Avatar} alt="avatar" className="w-full" />
              </div>
              <div>
                <p className="font-medium text-[16px] mb-1">
                  {followerDetails[followerId]?.name}
                </p>
                <p className="text-[#919191] text-[12px]">
                  {"@" + followerDetails[followerId]?.name?.split(" ").join(".")}
                </p>
              </div>

              {/* Follow/Unfollow Button */}
              {isFollowing ? (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleToggleFollow(followerId, true);
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
                    handleToggleFollow(followerId, false);
                  }}
                  className="ms-auto cursor-pointer py-3 px-10 bg-[#34D15C] text-white rounded-4xl flex justify-center items-center"
                >
                  Follow
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Followers;
