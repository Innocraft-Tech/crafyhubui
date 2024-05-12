'use client';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ProjectSlider } from './projectsslider';
import { getAllUsers } from '@/app/api/auth/api-helper';
import { ReactNode, useEffect, useState } from 'react';
import { useGetAllUsersQuery } from '@/redux/api/usersApi';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import ChatBox from '@/components/message/chat-box';
import Conversation from '@/components/message/conversation';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useGetUserQuery } from '@/redux/api/usersApi';
import useSocket from '@/lib/hooks/useSocket';

// import { useGetUsersQuery } from '@/redux/api/usersApi';
// import { useGetAllUserQuery } from '@/redux/api/usersApi';
interface User {
  profilePicture: string | undefined;
  firstName: ReactNode;
  tools: any;
}

export function DiscoverCard() {
  // const [userData, setUser] = React.useState<User[]>([]);
  const user_token = Cookies.get('access_token');
  console.log('user_token', typeof user_token);
  const dataOfUser = useGetUserQuery(user_token ? user_token : '').data?.user;
  console.log('Userdata', dataOfUser);

  const [text, setText] = useState('');
  const { data, isError, isLoading } = useGetAllUsersQuery();
  const { users: userData } = data || {};
  const [showChat, setShowChat] = useState(false);
  const socket = useSocket('http://localhost:8800');

  const [sendMessage, setSendMessage] = useState({});

  const [chatId, setChatId] = useState('');
  const [receiverId, setReceiverId] = useState('');

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  useEffect(() => {
    if (dataOfUser?._id) {
      // socket.current = io("https://crafy-socket-server.onrender.com");
      socket?.emit('new-user-add', dataOfUser?._id);
      socket?.on('get-users', (users) => {
        // setOnlineUsers(users);
        console.log(users, 'users');
      });
      socket?.on('recieve-message', (data) => {
        console.log(data, 'recieve-message  ');
      });
    }
  }, [dataOfUser]);

  // Send Message to socket server
  useEffect(() => {
    console.log(sendMessage, 'sendMessage');
    if (sendMessage !== null) {
      console.log('socket send-message');
      socket?.emit('send-message', sendMessage);
    }
  }, [sendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket?.on('recieve-message', (data) => {
      console.log(data, 'recieve-message  ');
    });
    console.log('first');
  }, []);

  const fetchMessages = async (id: string) => {
    const messages = await axios
      .get(`https://crafy-server.onrender.com/message/${id}`)
      .catch((err) => console.log(err));
    const responseData = await messages.data.messages;
    console.log(responseData, 'responseData');
  };

  const showChatBox = (id: string) => {
    console.log(id, 'id');

    // const ID = localStorage.getItem('chatId');
    // const ID = '661acb2bdc9f192fb227d07d';
    // if (ID) {
    //   setChatId(ID);
    //   fetchMessages(ID);
    //   setShowChat((prevState) => !prevState);
    //   setReceiverId(id);
    //   return;
    // }

    axios
      .post('http://localhost:8080/chat', {
        senderId: dataOfUser?._id,
        receiverId: id,
      })
      .then((res) => {
        setChatId(res.data._id);
        console.log(res, 'res');
        localStorage.setItem('chatId', res.data._id);
        fetchMessages(res.data._id);
        setShowChat((prevState) => !prevState);
      })
      .catch((err) => {
        console.log(err, 'err');
      });
  };
  ///chat/user_id

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await getAllUsers();
  //       setUser(response);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);
  // console.log(userData);

  console.log(data, 'data', showChat);

  const onClickSendMessage = () => {
    const message = { chatId, senderId: dataOfUser?._id, text };
    setSendMessage({ ...message, receiverId });
    axios
      .post('http://localhost:8080/message/add', {
        ...message,
      })
      .then((res) => {
        console.log(res);
      })
      .then((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {showChat && (
        <div className="z-1 absolute bottom-5 right-5 w-1/4 divide-y rounded-md border shadow-md bg-white">
          <div className="flex gap-2 px-3 py-3 items-start">
            <>
              <div className="flex flex-col w-full bg-white w-3/4">
                <div
                  id="chat"
                  className="flex flex-col mt-2 flex-col-reverse overflow-y-scroll	 space-y-3 mb-2 pb-3 "
                >
                  {/* <div className="mt-2 mb-1 p-2 ml-5 rounded-br-none bg-blue-500 rounded-2xl text-white text-left ">
                    2/10
                  </div>
                  <div className="mt-2 mb-1 p-2 ml-5 rounded-br-none bg-blue-500 rounded-2xl text-white text-left ">
                    But numbers can
                  </div>
                  <div className="other mt-2  mr-5 rounded-bl-none float-none bg-gray rounded-2xl p-2">
                    Aww thx!!
                  </div>
                  <div className="mt-2 mb-1 p-2 ml-5 rounded-br-none bg-blue-500 rounded-2xl text-white text-left ">
                    Words can't describe how beautiful you are :)
                  </div>
                  <div className="other mt-2  mr-5 rounded-bl-none float-none bg-gray rounded-2xl p-2">
                    Words can't decsribe how ugly you are ;)
                  </div> */}
                </div>
                <div className="flex flex-row  items-center  bottom-0 my-2 w-full">
                  <div className="ml-2 flex flex-row border-gray items-center w-full border rounded-3xl h-12 px-2">
                    <button className="focus:outline-none flex items-center justify-center h-10 w-10 hover:text-red-600 text-red-400 ml-1">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                        />
                      </svg>
                    </button>
                    <div className="w-full">
                      <input
                        type="text"
                        id="message"
                        className="border rounded-2xl border-transparent w-full focus:outline-none text-sm h-10 flex items-center"
                        placeholder="Type your message...."
                        value={text}
                        name={'message'}
                        onChange={onChangeText}
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      id="self"
                      className="flex items-center justify-center h-10 w-10 mr-2 rounded-full bg-gray-200 hover:bg-gray-300 text-indigo-800  focus:outline-none"
                      onClick={onClickSendMessage}
                    >
                      <svg
                        className="w-5 h-5 transform rotate-90 -mr-px"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </>
          </div>
        </div>
      )}
      <div className="lg:grid px-32 py-5 discoverUsers">
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4">
          {userData?.map((user, index) => (
            <Card key={index} className="rounded-2xl p-5 my-2">
              <div className="flex items-center">
                <Avatar className="w-16 h-16">
                  <AvatarImage
                    src={user.profilePicture}
                    alt="@shadcn"
                    className="  object-cover"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="mx-3">
                  <h4 className="font-medium">{user.firstName}</h4>
                  <span className="font-light">New Jersey</span>
                </div>
              </div>
              <div className="flex my-5 gap-3">
                <Badge variant="secondary" className="p-2 font-normal">
                  $25 - $75/hour
                </Badge>
                <Badge
                  variant="secondary"
                  className="p-2 font-normal bg-green-300"
                >
                  Available
                </Badge>
              </div>
              <div className="grid">
                <div className="grid grid-cols-4 items-center gap-4">
                  {user.tools.map((tool: String, index: number) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="p-2 font-normal text-center rounded-md justify-center"
                    >
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="project-carousel">
                <ProjectSlider />
              </div>

              <Button
                onClick={() => showChatBox(user._id)}
                variant="default"
                className="rounded-xl w-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  className="mr-3"
                  fill="#fff"
                  viewBox="0 0 256 256"
                >
                  <path d="M225.88,30.12a13.83,13.83,0,0,0-13.7-3.58l-.11,0L20.14,84.77A14,14,0,0,0,18,110.88l85.61,40.55a2.08,2.08,0,0,1,.95.95L145.12,238a13.87,13.87,0,0,0,12.61,8c.4,0,.81,0,1.21-.05a13.9,13.9,0,0,0,12.29-10.09l58.2-191.93,0-.11A13.83,13.83,0,0,0,225.88,30.12Zm-8,10.4L159.73,232.43l0,.11a1.88,1.88,0,0,1-1.76,1.45,1.86,1.86,0,0,1-2-1.14l-40-84.36,48.24-48.24a6,6,0,1,0-8.49-8.49L107.52,140,23.15,100a2,2,0,0,1,.31-3.74l.11,0L215.48,38.08a1.94,1.94,0,0,1,1.92.52A2,2,0,0,1,217.92,40.52Z"></path>
                </svg>{' '}
                Get In Touch
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
