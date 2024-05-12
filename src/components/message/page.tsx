'use client';
import React, { useEffect, useRef, useState } from 'react';
import ChatBox from './chat-box';
import Conversation from './conversation';
import { Socket, io } from 'socket.io-client';
import useSocket from '@/lib/hooks/useSocket';
import { useGetUserQuery } from '@/redux/api/usersApi';
import Cookies from 'js-cookie';
import axios from 'axios';

const Messages = () => {
  const [user, setUser] = useState<any>({});
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const socket = useSocket('https://crafy-socket-server.onrender.com');
  const user_token = Cookies.get('access_token');
  console.log('user_token', typeof user_token);
  const dataOfUser = useGetUserQuery(user_token ? user_token : '').data?.user;

  useEffect(() => {
    if (socket) {
      socket.emit('new-user-add', 'Id');
      socket.on('get-users', (users) => {
        console.log(users);
        setOnlineUsers(users);
      });
    }
  }, [socket]);

  useEffect(() => {
    if (dataOfUser?._id) {
      console.log(dataOfUser._id, 'dataOfUser._id');
      axios
        .get(`http://localhost:8080/chat/${dataOfUser._id}`)
        .then((response) => console.log(response.data, 'messages'))
        .catch((err) => console.log(err));
    }
  }, [dataOfUser]);

  return (
    <div className="h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:flex">
      <div className="hidden h-full flex-col xl:flex xl:w-1/4">
        {/* ====== Chat List Start */}
        <div className="sticky border-b border-stroke px-6 py-7.5 dark:border-strokedark">
          <h3 className="text-lg font-medium text-black dark:text-white 2xl:text-xl">
            Chat
            <span className="rounded-md border-[.5px] border-stroke bg-gray-2 px-2 py-0.5 text-base font-medium text-black dark:border-strokedark dark:bg-boxdark-2 dark:text-white 2xl:ml-4">
              7
            </span>
          </h3>
        </div>
        <div className="flex max-h-full flex-col overflow-auto p-5">
          <form className="sticky mb-7">
            <input
              type="text"
              className="w-full rounded border border-stroke bg-gray-2 py-2.5 pl-5 pr-10 text-sm outline-none focus:border-primary dark:border-strokedark dark:bg-boxdark-2"
              placeholder="Search..."
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2">
              <svg
                width={18}
                height={18}
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.25 3C5.3505 3 3 5.3505 3 8.25C3 11.1495 5.3505 13.5 8.25 13.5C11.1495 13.5 13.5 11.1495 13.5 8.25C13.5 5.3505 11.1495 3 8.25 3ZM1.5 8.25C1.5 4.52208 4.52208 1.5 8.25 1.5C11.9779 1.5 15 4.52208 15 8.25C15 11.9779 11.9779 15 8.25 15C4.52208 15 1.5 11.9779 1.5 8.25Z"
                  fill="#637381"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.957 11.958C12.2499 11.6651 12.7247 11.6651 13.0176 11.958L16.2801 15.2205C16.573 15.5133 16.573 15.9882 16.2801 16.2811C15.9872 16.574 15.5124 16.574 15.2195 16.2811L11.957 13.0186C11.6641 12.7257 11.6641 12.2508 11.957 11.958Z"
                  fill="#637381"
                />
              </svg>
            </button>
          </form>
          <div className="no-scrollbar max-h-full space-y-2.5 overflow-auto">
            <ChatBox />
            <ChatBox />
            <ChatBox />
          </div>
        </div>
      </div>
      <Conversation />
    </div>
  );
};

export default Messages;
