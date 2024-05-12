'use client';
import React, { useEffect, useState, useRef, ChangeEvent } from 'react';
// import {
//   addMessage,
//   getMessages,
// } from "../../api/auth/api-helper/message-request";
// import { getUser } from "../../api/auth/api-helper/index";
// import './index.css';
import { format } from 'timeago.js';

interface ChatBoxProps {
  chat: any; // Adjust the type according to your data structure
  currentUser: string; // Assuming currentUser is a string
  setSendMessage: React.Dispatch<React.SetStateAction<any>>; // Adjust the type according to your data structure
  receivedMessage: any; // Adjust the type according to your data structure,
  online: Boolean;
}

const ChatBox: React.FC<ChatBoxProps> = ({
  chat,
  currentUser,
  setSendMessage,
  receivedMessage,
  online,
}) => {
  console.log('chat', chat);
  const [sender, setSender] = useState<any>(null);
  const [receiver, setReceiver] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  const handleChange = (newMessage: string) => {
    setNewMessage(newMessage);
  };

  useEffect(() => {
    const getSender = async () => {
      // const sender = await getUser(currentUser);
      // setSender(sender);
    };
    getSender();
  }, []);

  // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id: string) => id !== currentUser);

    const getUserData = async () => {
      try {
        // const data = await getUser(userId);
        // setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // const data = await getMessages(chat._id);
        // console.log('data message', data);
        // setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  // Always scroll to the last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send Message
  const handleSend = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    const receiverId = chat.members.find((id: string) => id !== currentUser);
    // send message to socket server
    setSendMessage({ ...message, receiverId });
    // send message to the database
    try {
      // const data = await addMessage(message);
      // setMessages([...messages, data]);
      // setNewMessage('');
    } catch {
      console.log('error');
    }
  };

  // Receive Message from the parent component
  useEffect(() => {
    console.log('Message Arrived: ', receivedMessage);
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  const scroll = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {chat ? (
        <>
          {/* chat-sender */}
          {/* <div className="chat-sender">
              <div onClick={() => imageRef.current?.click()}>+</div>
              <InputEmoji value={newMessage} onChange={handleChange} />
              <div className="send-button button" onClick={handleSend}>
                Send
              </div>
              <input
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
                ref={imageRef}
              />
            </div>{" "} */}
          <div className="dark:bg-darkblack-500 basis-7/12 lg:col-span-7 col-span-12 relative">
            <header className="bg-White border-b border-b-gray-100 pt-3">
              <div className="crafy-user-items pb-1">
                <div className="flex justify-between items-center p-2">
                  <div className="flex space-x-5 grow">
                    <div className="chat-user-profile w-14 h-14 relative">
                      <img
                        src={userData?.profilePicture}
                        className=" object-cover w-14 h-14 rounded-[50px] border border-Pink-200"
                        alt="Profile-pic"
                      />
                      <span className="bg-gray-100 border border-blue-100 block w-[14px] h-[14px] rounded-full absolute bottom-1 right-0"></span>
                    </div>
                    <div className="chat-user-name">
                      <span className="text-md block">
                        {userData?.firstName} {userData?.lastName}
                      </span>
                      <span className="text-sm font-extralight">
                        {online ? 'Online' : 'Offline'}
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
            </header>
            <div className="lg:pt-20 h-full px-3">
              {messages.map((message: any) => {
                const isCurrentUser = message.senderId === currentUser;

                return (
                  <div
                    ref={scroll}
                    key={message.id} // Add a unique key for each message
                  >
                    {isCurrentUser ? (
                      // Style for current user
                      <div className="message-sender my-6">
                        <div className="flex justify-end px-12">
                          <div className="chat-user-name">
                            <span className="text-xs text-gray-100 pr-3">
                              {sender &&
                                sender.firstName + ' ' + sender.lastName}
                            </span>
                          </div>
                          <div className="creator-time">
                            <span className="text-xs text-gray-100">
                              {format(message.createdAt)}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-end items-end space-x-3">
                          <div className="flex space-x-3">
                            {/* Add your profile picture here */}
                            <div className="p-3 bg-[#EBEBEB] max-w-96 dark:bg-darkblack-600  dark:text-bgray-50 rounded-r-lg rounded-b-lg text-bgray-900 text-sm font-normal">
                              {message.text}
                            </div>
                          </div>
                          <img
                            src={sender && sender.profilePicture}
                            className=" object-cover w-10 h-10 rounded-[50px] border border-Pink-200"
                            alt="Profile-pic"
                          />
                        </div>
                      </div>
                    ) : (
                      // Style for other users
                      <div className="message-creator">
                        <div className="flex px-12 ">
                          <div className="chat-user-name">
                            <span className="text-xs text-gray-100 pr-3">
                              {userData &&
                                userData.firstName + ' ' + userData.lastName}
                            </span>
                          </div>
                          <div className="creator-time">
                            <span className="text-xs text-gray-100">
                              {format(message.createdAt)}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-start items-end space-x-3">
                          <div className="flex space-x-3">
                            {/* Add other user's profile picture here */}
                            {userData && userData.profilePicture && (
                              <img
                                src={userData && userData.profilePicture}
                                className=" object-cover w-10 h-10 rounded-[50px] border border-Pink-200"
                                alt="Profile-pic"
                              />
                            )}
                            <div className="p-3 bg-[#EBEBEB] max-w-96 dark:bg-darkblack-600  dark:text-bgray-50 rounded-r-lg rounded-b-lg text-bgray-900 text-sm font-normal">
                              {/* {message.fileData &&
                                <div>

                                  <img
                                    src={`data:image/jpeg;base64,${message.fileData}`}
                                    alt="Shared File"
                                    className="w-10 h-10 object-cover rounded-lg"
                                  />
                                </div>}
                              {message.text} */}
                              {/* <div className="p-3 bg-[#EBEBEB] max-w-96 dark:bg-darkblack-600 dark:text-bgray-50 rounded-r-lg rounded-b-lg text-bgray-900 text-sm font-normal">
                                {message.fileData ? (
                                  <div>
                                    <img
                                      src={`data:image/jpeg;base64,${message.fileData}`}
                                      alt="Shared File"
                                      className="w-10 h-10 object-cover rounded-lg"
                                    />
                                  </div>
                                ) : (
                                  <div>{message.text}</div>
                                )}
                              </div> */}
                              <div className="p-3 bg-[#EBEBEB] max-w-96 dark:bg-darkblack-600 dark:text-bgray-50 rounded-r-lg rounded-b-lg text-bgray-900 text-sm font-normal">
                                {/* const bufferData =newMessage.fileData.data;
                                fs.writeFileSync('image.jpg', bufferData);
                                console.log("FILE DATA",fileData) */}
                                {message.fileData ? (
                                  <div>
                                    {message.fileData.data instanceof Buffer ? (
                                      <img
                                        src={`data:image/jpeg;base64,${message.fileData.data.toString(
                                          'base64',
                                        )}`}
                                        // <img src="data:image/jpeg;base64,${buffer.toString('base64')}"
                                        alt="Shared File"
                                        className="w-10 h-10 object-cover rounded-lg"
                                      />
                                    ) : (
                                      <img
                                        src={message.fileData.data} // Assuming message.fileData is already a URL
                                        alt="Shared File"
                                        className="w-10 h-10 object-cover rounded-lg"
                                      />
                                    )}
                                  </div>
                                ) : (
                                  <div>{message.text}</div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {/* </div> */}
    </>
  );
};

export default ChatBox;
