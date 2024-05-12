'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import { userChats } from '../../app/api/auth/api-helper/chat-request';

// import './chat.css';
// import { getUser } from '../api/auth/api-helper';
import Image from 'next/image';
import Conversation from './conversation';
import ChatBox from './chatBox';
import { getUser } from '@/app/api/auth/api-helper';

const Chat: React.FC = () => {
  const socket = useRef<Socket | null>(null);
  const [user, setUser] = useState<any>({});
  const Id =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('userId') || '{}')
      : null;

  console.log(Id);
  useEffect(() => {
    const getFinaluser = async () => {
      const user = await getUser(Id).catch((err) => console.log(err));
      console.log(user);
      setUser(user);
    };
    getFinaluser();
  }, []);

  const [chats, setChats] = useState<any[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const [currentChat, setCurrentChat] = useState<any>(null);
  const [sendMessage, setSendMessage] = useState<any>(null);
  const [receivedMessage, setReceivedMessage] = useState<any>(null);

  // Get the chat in chat section
  useEffect(() => {
    const getChats = async () => {
      try {
        const data = await userChats(user._id);
        console.log('chats' + data);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io('https://crafy-socket-server.onrender.com');
    socket.current.emit('new-user-add', Id);
    socket.current.on('get-users', (users) => {
      setOnlineUsers(users);
    });
  }, [setUser]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current?.emit('send-message', sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket.current?.on('recieve-message', (data) => {
      console.log(data);
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat: any) => {
    const chatMember = chat?.members.find(
      (member: string) => member !== user._id,
    );
    const online = onlineUsers?.find((user) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div className="">
      {/* Left Side */}
      {/* <div className="Left-side-chat">
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div
                key={chat._id}
                onClick={() => {
                  setCurrentChat(chat);
                }}
              >
                <Conversation
                  data={chat}
                  currentUser={user._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
          </div>
        </div>
      </div> */}

      {/* Right Side */}
      {/* <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}></div>
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
        />
      </div> */}

      <main className="message-layout mt-16 fixed">
        <section className="lg:flex w-full relative">
          <aside className="bg-white pt-6 basis-5/12  hidden lg:block border-r border-r-gray-100">
            <div className="flex justify-between items-center mb-6 border-b pb-6 border-b-gray-100">
              <div className="search-people w-full flex items-center border border-Pink-200 rounded-full bg-White-800 px-5 mx-5">
                <input
                  type="text"
                  placeholder="Search by People..."
                  className="ml-2 flex-grow p-2 border-none focus:outline-none rounded-full"
                />
                {/* <Image src={searchBar} alt="searchBar" width={24} height={24} /> */}
              </div>
              <div className="menu-dots mr-3">
                {/* <Image
                  src={menudotIcon}
                  alt="searchBar"
                  width={24}
                  height={24}
                /> */}
              </div>
            </div>
            <div className="active-chats-heaading px-5">
              <h3 className="text-md font-medium">Active Chats</h3>
            </div>
            <div className="crafy-chat-list px-5 relative overflow-hidden z-30 h-dvh w-full overflow-y-scroll ">
              <div className="crafy-chat-list px-5">
                <div className="crafy-chat-user my-5">
                  {chats &&
                    chats.map((chat) => (
                      <div
                        key={chat._id}
                        onClick={() => {
                          setCurrentChat(chat);
                        }}
                      >
                        <Conversation
                          chatId={chat._id}
                          data={chat}
                          currentUser={user._id}
                          online={checkOnlineStatus(chat)}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </aside>
          {chats && (
            <ChatBox
              chat={currentChat}
              currentUser={Id}
              setSendMessage={setSendMessage}
              receivedMessage={receivedMessage}
              online={checkOnlineStatus(currentChat)}
            />
          )}
        </section>

        {/* <div className="Right-side-chat">
          <div style={{ width: "20rem", alignSelf: "flex-end" }}></div>
          <ChatBox
            chat={currentChat}
            currentUser={user._id}
            setSendMessage={setSendMessage}
            receivedMessage={receivedMessage}
          />
        </div> */}
      </main>
    </div>
  );
};

export default Chat;
