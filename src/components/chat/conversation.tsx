'use client';
// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { getUser } from "../../api/auth/api-helper/index";
// import '../../chat/chat.css'

// interface ConversationProps {
//   data: {
//     members: string[];
//   };
//   currentUser: string;
//   online: boolean;
// }

// interface UserData {
//   profilePicture: string;
//   firstname: string;
//   lastname: string;
// }

// const Conversation: React.FC<ConversationProps> = ({ data, currentUser,online }) => {
//   const [userData, setUserData] = useState<UserData | null>(null);

//   useEffect(() => {
//     const userId = data.members.find((id) => id !== currentUser);

//     const getUserData = async () => {
//       try {
//         const data = await getUser(userId);
//         console.log(data)
//         setUserData(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getUserData();
//   }, [data.members, currentUser]);

//   return (
//     <>
//       <div className="follower conversation">
//         <div>
//           {<div className="online-dot"></div>}
//           <img
//             src={userData?.profilePicture }
//             alt="Profile"
//             className="followerImage"
//             style={{ width: "50px", height: "50px" }}
//           />
//           <div className="name" style={{ fontSize: '0.8rem' }}>
//             <span>{userData?.firstName} {userData?.lastName}</span>
//             <span style={{ color: online ? "#51e200" : "" }}>{online ? "Online" : "Offline"}</span>
//           </div>
//         </div>
//       </div>
//       <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
//     </>
//   );
// };

// export default Conversation;

import React, { useEffect, useState } from 'react';
// import { useDispatch } from "react-redux";
// import { getUser } from "../../api/auth/api-helper/index";
import Image from 'next/image';
import { format } from 'timeago.js';
import { getMessages } from '@/app/api/auth/api-helper/message-request';

interface ConversationProps {
  data: any;
  currentUser: string;
  online: boolean;
  chatId: any;
}

const Conversation: React.FC<ConversationProps> = ({
  data,
  currentUser,
  online,
  chatId,
}) => {
  const [userData, setUserData] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessages(chatId);
        console.log('data message', data);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (data !== null) fetchMessages();
  }, [data]);

  useEffect(() => {
    const userId = data.members.find((id: string) => id !== currentUser);
    const getUserData = async () => {
      try {
        // const data = await getUser(userId);
        // setUserData(data);
        // dispatch({ type: "SAVE_USER", data: data });
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, [currentUser, data.members]);

  return (
    <>
      {/* <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
          <img
            src={userData?.profilePicture}
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{ fontSize: "0.8rem" }}>
            <span>
              {userData?.firstName} {userData?.lastName}
            </span>
            <span style={{ color: online ? "#51e200" : "" }}>
              {online ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} /> */}

      <div className="crafy-user-items">
        <div className="flex justify-between items-center p-2 hover:bg-blue-100 rounded-xl transition-all">
          <div className="flex space-x-5 grow">
            <div className="chat-user-profile w-14 h-14 relative">
              <img
                src={userData?.profilePicture}
                className=" object-cover w-14 h-14 rounded-[50px] border border-Pink-200"
                alt="Profile-pic"
              />
              <span
                style={{ backgroundColor: online ? '#F05' : '#d9d9d9' }}
                className=" border border-blue-100 block w-[14px] h-[14px] rounded-full absolute bottom-1 right-0"
              ></span>
            </div>
            <div className="chat-user-name">
              <span className="text-md block">
                {userData?.firstName} {userData?.lastName}
              </span>
              <span className="text-sm font-extralight">
                {messages.length > 0 ? messages[messages.length - 1].text : ''}
              </span>
            </div>
          </div>
          <div className="notification">
            <span className="text-sm">
              {format(
                messages.length > 0
                  ? messages[messages.length - 1].createdAt
                  : '',
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Conversation;
