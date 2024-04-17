import { Flex } from '@chakra-ui/layout';
import { useColorMode, useColorModeValue } from '@chakra-ui/system';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
  BsArrowBarUp,
  BsDot,
  BsEmojiLaughing,
  BsThreeDots,
} from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import { GoDotFill } from 'react-icons/go';
import { IoMdClose } from 'react-icons/io';
import { IoSend } from 'react-icons/io5';
import { MdOutlineAttachFile } from 'react-icons/md';
import useUserInfo from '../../../hooks/useUserInfo';
import useSocket from '../../../hooks/useSocket';
import {
  useChatStartMutation,
  useGetChatsQuery,
  useLazyGetChatsQuery,
  useSendMessageMutation,
} from 'store/api/chatApi';
import { skipToken } from '@reduxjs/toolkit/query';

type ConversationProps = {
  user: User;
  closeConversationModal: () => void;
};

const Conversation = ({
  user: selectedUser,
  closeConversationModal,
}: ConversationProps) => {
  const socket = useSocket(process.env.NEXT_PUBLIC_SERVER_SOCKET_URI);
  const { userInfo } = useUserInfo();

  const [onlineUsers, setOnlineUsers] = useState<OnlineUsers[]>([]);
  const [text, setText] = useState<string>('');
  const [socketSendMessage, setSocketSendMessage] = useState(null);
  const [conversation, setConversation] = useState<MessageResponse[]>([]);

  const [chatStart, { isError: chatError, isSuccess, error, data: chatData }] =
    useChatStartMutation();

  const [sendMessage, { isSuccess: msgSuccess }] = useSendMessageMutation();

  console.log(msgSuccess, 'msgSuccess');
  console.log(chatData, chatError);
  // const { data, isError, isLoading } = useGetChatsQuery(chatData?.id);

  const { data, isLoading, isFetching } = useGetChatsQuery(
    chatData?._id ? chatData._id : skipToken,
  );

  const [Chat, result] = useLazyGetChatsQuery();

  console.log(data, result);

  console.log(userInfo, selectedUser);

  const [chats, setChats] = useState<MessageResponse | []>([]);

  useEffect(() => {
    if (result) {
      setChats(result.data);
    }
  }, [result]);

  useEffect(() => {
    if (data) {
      setChats(data);
    }
  }, [data]);

  useEffect(() => {
    if (userInfo && selectedUser) {
      const data = {
        senderId: userInfo._id,
        receiverId: selectedUser._id,
      };
      chatStart(data);
    }
  }, [userInfo, selectedUser]);

  useEffect(() => {
    if (userInfo?._id) {
      socket?.emit('new-user-add', userInfo?._id);
      socket?.on('get-users', (users) => {
        setOnlineUsers(users);
        console.log(users, 'users');
      });
      socket?.on('recieve-message', (data) => {
        console.log(data, 'recieve-message  ');
        Chat(data.chatId);
      });
    }
  }, [userInfo]);

  // Send Message to socket server
  useEffect(() => {
    console.log(socketSendMessage, 'socketSendMessage');
    if (socketSendMessage !== null) {
      console.log('socket send-message');
      socket?.emit('send-message', socketSendMessage);
    }
  }, [socketSendMessage]);

  // Get the message from socket server
  useEffect(() => {
    socket?.on('recieve-message', (data) => {
      console.log(data, 'recieve-message  ');
      Chat(data.chatId);
    });
  }, []);

  const handleChange = (event) => {
    setText(event.currentTarget.textContent);
  };

  const onClickSendMessage = () => {
    const message = { chatId: chatData._id, senderId: userInfo?._id, text };
    console.log(message);

    sendMessage(message).then(() => {
      setSocketSendMessage({
        ...message,
        receiverId: selectedUser._id,
        // receiverId: userInfo._id,
        // senderId: selectedUser._id,
      });
    });
  };

  return (
    <div
      className={`fixed bottom-0 right-[12px] z-10 
      h-4/6 w-max origin-bottom-right  py-2 py-2 pb-0 shadow-xl shadow-shadow-500 transition-all duration-300 ease-in-out dark:shadow-none md:pr-4 
    ${selectedUser ? 'scale-100' : 'scale-0'}`}
    >
      <div className="flex h-full w-[270px] flex-col gap-3 rounded-[20px] bg-white py-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none sm:w-[460px]">
        <div className="flex items-center justify-between gap-2 px-6">
          <div className="!z-5 relative flex flex-grow !flex-row flex-col items-center rounded-[20px] rounded-[20px]  dark:text-white dark:shadow-none">
            <div className="flex w-auto flex-row items-center">
              <span className="flex items-center text-brand-500 dark:text-white">
                <div className="relative flex h-[40px] w-[40px] items-center justify-center rounded-full border-[0px] border-white bg-lightPrimary  dark:bg-navy-700">
                  <Image
                    alt=""
                    loading="lazy"
                    width="16"
                    height="16"
                    className="h-full w-full rounded-full"
                    src={selectedUser?.profilePicture}
                  />
                  <span
                    className={`absolute bottom-1 right-0 block h-2 w-2 rounded-full border-2 border-green-500  ${
                      onlineUsers.some(
                        (onlineUser) => onlineUser.userId === selectedUser?._id,
                      )
                        ? 'bg-green-500'
                        : 'bg-white'
                    }`}
                  ></span>
                </div>
              </span>
            </div>
            <div className="h-50 ml-4 flex w-auto flex-col justify-center">
              <h4 className="text-xl font-bold text-navy-700 dark:text-white">
                {selectedUser?.firstName} {selectedUser?.lastName}
              </h4>
              {/* <p className="flex items-center font-dm text-sm font-medium text-gray-600">
                <GoDotFill className="mr-1 inline text-green-500" />
                Active
              </p> */}
            </div>
          </div>

          <button
            onClick={closeConversationModal}
            className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"
          >
            <IoMdClose className="h-6 w-6" />
          </button>
        </div>
        <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />
        {/* <div className="flex-basis-0 h-1 flex-shrink-0 flex-grow px-6 py-3"> */}
        <div className="no-scrollbar py-7.5 max-h-full flex-1 space-y-3.5 overflow-auto px-6 text-navy-700 dark:text-white">
          {data?.messages?.map((message) => (
            <>
              {message.senderId === userInfo?._id ? (
                <div className="ml-auto max-w-sm text-end">
                  <div className="mb-2.5 inline-block rounded-2xl rounded-br-none bg-brand-500 px-5 py-3 dark:bg-brand-400">
                    <p className="font-medium text-white">{message.text}</p>
                  </div>
                  <p className="text-right text-xs font-medium text-gray-600">
                    1:55pm
                  </p>
                </div>
              ) : (
                <div className="max-w-sm">
                  {/* <p className="mb-2.5 text-sm font-medium">
                    {selectedUser?.firstName} {selectedUser?.lastName}
                  </p> */}
                  <div className="mb-2.5  inline-block rounded-2xl rounded-tl-none bg-lightPrimary px-5 py-3 text-navy-700">
                    <p className="font-medium">{message.text}</p>
                  </div>
                  <p className="text-xs font-medium text-gray-600">1:55pm</p>
                </div>
              )}
            </>
          ))}
        </div>

        <div className=" flex items-center gap-2 px-6 pt-[10px]">
          <span className="inline cursor-pointer text-gray-700 dark:text-white">
            <MdOutlineAttachFile className="h-6 w-6" />
          </span>
          <div className="box-border flex w-full min-w-0 flex-1 flex-row rounded-full bg-lightPrimary px-4 py-4 text-navy-700 dark:bg-navy-900 dark:text-white">
            <div className="flex flex-1 items-end pr-2">
              <button className="py-0">
                <span>
                  <BsEmojiLaughing className="h-5 w-5 text-gray-700 dark:text-white" />
                </span>
              </button>
            </div>

            <div className="relative w-full ">
              <div
                contentEditable="true"
                role="textbox"
                spellCheck="true"
                className="max-h-16 min-h-4 overflow-y-auto overflow-x-hidden  border-0 text-sm outline-none"
                style={{
                  userSelect: 'text',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
                onBlur={handleChange}
                data-lexical-editor="true"
                suppressContentEditableWarning={true}
                placeholder="Type message..."
              >
                {text}
                {/* <p className="text-indent-0 mb-0 mt-0 select-text">
                  <span
                    className="selectable-text copyable-text"
                    data-lexical-text="true"
                  >
                    {content}
                  </span>
                </p> */}
              </div>
            </div>
          </div>
          <span
            onClick={onClickSendMessage}
            className="inline cursor-pointer text-gray-700 dark:text-white"
          >
            <IoSend className="h-6 w-6" />
          </span>

          {/* <div className="box-border flex min-h-20 w-full min-w-0 flex-1 flex-col rounded-lg border border-gray-300 bg-white px-9 py-9 md:px-8">
            <div className="flex flex-1 items-end pr-10">
              <button className="py-0">
                <span>
                  <svg viewBox="0 0 24 24" className="text-current h-6 w-6">
                    <path
                      fill="currentColor"
                      d="M9.153,11.603c0.795,0,1.439-0.879,1.439-1.962S9.948,7.679,9.153,7.679S7.714,8.558,7.714,9.641S8.358,11.603,9.153,11.603z M5.949,12.965c-0.026-0.307-0.131,5.218,6.063,5.551c6.066-0.25,6.066-5.551,6.066-5.551C12,14.381,5.949,12.965,5.949,12.965z M17.312,14.073c0,0-0.669,1.959-5.051,1.959c-3.505,0-5.388-1.164-5.607-1.959C6.654,14.073,12.566,15.128,17.312,14.073z M11.804,1.011c-6.195,0-10.826,5.022-10.826,11.217s4.826,10.761,11.021,10.761S23.02,18.423,23.02,12.228C23.021,6.033,17.999,1.011,11.804,1.011z M12,21.354c-5.273,0-9.381-3.886-9.381-9.159s3.942-9.548,9.215-9.548s9.548,4.275,9.548,9.548C21.381,17.467,17.273,21.354,12,21.354z M15.108,11.603c0.795,0,1.439-0.879,1.439-1.962s-0.644-1.962-1.439-1.962s-1.439,0.879-1.439,1.962S14.313,11.603,15.108,11.603z"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
            <div className="relative flex-1">
              <div
                className="w-full"
                contenteditable="true"
                role="textbox"
                spellcheck="true"
              >
                <p className="selectable-text">
                  asasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasa
                </p>
              </div>
            </div>
          </div> */}

          {/* <form>
            <label for="chat" className="sr-only">
              Your message
            </label>
            <div className="flex items-center rounded-lg bg-gray-50 px-3 py-2 dark:bg-gray-700">
              <button
                type="button"
                className="inline-flex cursor-pointer justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <button
                type="button"
                className="cursor-pointer rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-.464 5.535a1 1 0 10-1.415-1.414 3 3 0 01-4.242 0 1 1 0 00-1.415 1.414 5 5 0 007.072 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <textarea
                id="chat"
                rows="1"
                className="mx-4 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Your message..."
              ></textarea>
              <button
                type="submit"
                className="inline-flex cursor-pointer justify-center rounded-full p-2 text-blue-600 hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
              >
                <svg
                  className="h-6 w-6 rotate-90"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button>
            </div>
          </form> */}

          {/* <form className="flex items-center justify-between">
            <div className="flex h-full w-full items-center rounded-full bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white">
              <p className="pl-3 pr-2 text-xl">
                <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
              </p>
              <input
                type="text"
                placeholder="Search..."
                className="text-md block h-full w-full rounded-full bg-lightPrimary font-medium text-navy-700 outline-none placeholder:!text-gray-400 dark:bg-navy-900 dark:text-white dark:placeholder:!text-white "
              />
              <p className="pl-3 text-xl">
                <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
              </p>
              <p className="pl-3 pr-2 text-xl">
                <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
              </p>
            </div>
            <button className="bg-primary text-red flex items-center justify-center rounded-md hover:bg-opacity-90">
              check
            </button>
          </form> */}
        </div>
      </div>
    </div>
  );
};

export default Conversation;
