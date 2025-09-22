import React, { useEffect, useState } from 'react'
import Avatar from "../../assets/Images/ImageAvatar.png"
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, sendPrompt } from '../../Store/Slices/UserSlice';
import InputField from '../InputField/InputField';


function Chat() {
    const {follower_id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userId = JSON.parse(localStorage.getItem("userId"))
    let {followers,following,posts,user,promptResponse,chat,loading, error } = useSelector((state) => state.user);

   const [messages, setMessages] = useState(() => {
  // Load from localStorage initially
  return JSON.parse(localStorage.getItem("chat")) || [];
});

    useEffect(() => {
  if (promptResponse) {
    setMessages(prev => [...prev, { sender: "prompt", content: promptResponse }]);
  }
}, [promptResponse]);

    useEffect(() => {
     localStorage.setItem("chat", JSON.stringify(messages));
}, [messages]);


    useEffect(() => {
        dispatch(getUser(follower_id));
      }, [follower_id]);

      

      async function sendMessage (){
         let message = document.getElementById("message").value;

        //  messages.push({sender:"me",content:message});
         setMessages([...messages, { sender: "me", content: message }]);
         chat = messages;

        // localStorage.setItem("chat",JSON.stringify(chat));
            
        //  setBody(document.getElementsByClassName("chat").innerHTML+=`
        //  <div className="ms-auto bg-[#34D15C] text-white border-2 rounded-[4px] p-4 mt-5">${message}</div>
        //  `);
         dispatch(sendPrompt({user_id:userId,content:message}));
         setTimeout(async()=>{
            // console.log(promptResponse);
            // messages.push({sender:"prompt",content:promptResponse});
            // setMessages(prev => [...prev, { sender: "prompt", content: promptResponse }]);
            chat = messages;
            // localStorage.setItem("chat",JSON.stringify(chat));
            
            
         },1000)
      }

  return (
   <>
        <div className="mt-15 border-b-2 border-gray-200 pb-5">
            
           <div className="w-[80%] mx-auto flex items-center">
                  <div onClick={
            ()=>{
                navigate(`/followerDetails/${follower_id}`);
            }
        } className="bg-[#34D15C] mr-6 p-5 w-[15%] lg:w-[10%] rounded-[4px] flex justify-center items-center cursor-pointer">
           <i className="fa-solid fa-arrow-left text-white"></i>
        </div>
              <div>
                <p className="font-medium text-[16px] mb-1">{user.name}</p>
                <p className="text-[#919191] text-[12px]">{user.userName}</p>
              </div>
              <div className="ms-auto cursor-pointer w-[42px] h-[42px] text-[#34D15C] rounded-full border-2 bg-[#E8FDED] border-[#EEEEEE] flex justify-center items-center"><i className="fa-solid fa-phone"></i></div>
           </div>
        </div>

         <div className="bg-[#F8FBFF]">
            <div className="w-[80%] mx-auto flex flex-col chat">
               {messages.map((msg,idx)=>(
                  msg.sender == "me"?(<div key={idx} className="ms-auto bg-[#34D15C] text-white border-2 rounded-[14px] p-4 mt-5">{msg.content}</div>):(<div key={idx} className="me-auto border-2 border-gray-400 rounded-[14px] p-4 mt-5">{msg.content}</div>)
                ))}
            </div>
         </div>



         <div className="my-15 border-t-2 border-gray-200 pt-5 self-end">
             <div className="w-[80%] mx-auto flex items-center">
              <input id="message" className="border-2 rounded-full border-[#8080808e] p-4" placeholder='Say something.......' type="text" />
              <div onClick={()=>{
                sendMessage();
              }} className="ms-auto cursor-pointer w-[42px] h-[42px] text-white rounded-full border-2 bg-[#34D15C] border-[#EEEEEE] flex justify-center items-center"><i className="fa-solid fa-paper-plane"></i></div>
        </div>
        </div>
   </>
  )
}

export default Chat