import Avatar from "../../assets/Images/ImageAvatar.png"
import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser, sendPrompt, addMessage } from "../../Store/Slices/UserSlice";

function Chat() {
  const { follower_id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = JSON.parse(localStorage.getItem("userId"));
  const { user, chat, loading } = useSelector((state) => state.user);

  const inputRef = useRef(null);

  // Load user info
  useEffect(() => {
    if (follower_id) {
      dispatch(getUser(follower_id));
    }
  }, [follower_id, dispatch]);

  const handleSendMessage = () => {
    const message = inputRef.current.value.trim();
    if (!message) return;

    // Add user message locally in Redux
    dispatch(addMessage({ sender: "me", content: message }));

    // Send to backend
    dispatch(sendPrompt({ user_id: userId, content: message }));

    inputRef.current.value = "";
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="border-b-2 border-gray-200 p-4 ">
         <div className="w-[80%] mx-auto flex items-center">
            <div
          onClick={() => navigate(`/followerDetails/${follower_id}`)}
          className="bg-[#34D15C] mr-4 p-3 rounded flex justify-center items-center cursor-pointer"
        >
          <i className="fa-solid fa-arrow-left text-white"></i>
        </div>
        <div>
          <p className="font-medium text-[16px]">{user?.name}</p>
          <p className="text-[#919191] text-[12px]">{user?.userName}</p>
        </div>
        <div className="ml-auto cursor-pointer w-[42px] h-[42px] text-[#34D15C] rounded-full border bg-[#E8FDED] flex justify-center items-center">
          <i className="fa-solid fa-phone"></i>
        </div>
         </div>
        
      </div>

      {/* Chat Messages */}
      <div className="flex-1 bg-[#F8FBFF] overflow-y-auto p-4">
        <div className="w-[80%] mx-auto flex flex-col">
          {chat.map((msg, idx) => (
            <div
              key={idx}
              className={`max-w-[70%] p-3 rounded-[14px] mt-3 ${
                msg.sender === "me"
                  ? "ms-auto bg-[#34D15C] text-white"
                  : "me-auto border border-gray-400"
              }`}
            >
              {msg.content}
            </div>
          ))}
          {loading && (
            <div className="me-auto border border-gray-300 rounded-[14px] p-3 mt-3 text-gray-500 text-sm">
              Typing...
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t-2 border-gray-200 p-4">
        <div className="w-[80%] mx-auto flex items-center">
          <input
            ref={inputRef}
            className="flex-1 border rounded-full border-gray-400 p-3"
            placeholder="Say something..."
            type="text"
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="ml-3 cursor-pointer w-[42px] h-[42px] text-white rounded-full bg-[#34D15C] flex justify-center items-center"
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
