'use client';
import Image from 'next/image';
import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { BsEmojiLaughing } from 'react-icons/bs';
import { skipToken } from '@reduxjs/toolkit/query';
import { IoMdClose } from 'react-icons/io';
import { IoSend } from 'react-icons/io5';
import { MdOutlineAttachFile } from 'react-icons/md';
import {
  useChatStartMutation,
  useGetChatsQuery,
  useGetUserChatsQuery,
  useSendMessageMutation,
} from 'store/api/chatApi';
import useSocket from '../../../hooks/useSocket';
import useUserInfo from '../../../hooks/useUserInfo';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from 'utils/cookie';
import Card from 'components/card';

type ConversationProps = {
  user?: User;
  closeConversationModal?: () => void;
};

const Conversation = ({
  user: selectedUser,
  closeConversationModal,
}: ConversationProps) => {
  const socket = useSocket(process.env.NEXT_PUBLIC_SERVER_SOCKET_URI);
  const { userInfo } = useUserInfo();

  const [onlineUsers, setOnlineUsers] = useState<OnlineUsers[]>([]);
  // const [text, setText] = useState<string>('');
  const [socketSendMessage, setSocketSendMessage] = useState(null);
  const [conversation, setConversation] = useState<Message[]>([]);

  const [chatStart, { isError: chatError, isSuccess, error, data: chatData }] =
    useChatStartMutation();

  const [sendMessage, { isSuccess: msgSuccess }] = useSendMessageMutation();

  const { data, isLoading, isFetching } = useGetChatsQuery(
    chatData?._id ? chatData._id : skipToken,
  );

  const { data: userChats } = useGetUserChatsQuery(
    userInfo?._id ? userInfo._id : skipToken,
  );

  const divRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  useEffect(() => {
    if (data) {
      setConversation(data.messages);
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
      });
      socket?.on('recieve-message', (data) => {
        setConversation((prevState) => [...prevState, data]);
      });
    }
  }, [userInfo]);

  // Send Message to socket server
  useEffect(() => {
    if (socketSendMessage !== null) {
      socket?.emit('send-message', socketSendMessage);
    }
  }, [socketSendMessage]);

  const onClickSendMessage = () => {
    const text = divRef.current.textContent;

    if (!text.trim()) return;
    divRef.current.textContent = '';

    const message = {
      chatId: chatData._id,
      senderId: userInfo?._id,
      text,
    };

    sendMessage(message).then((res) => {
      if ('data' in res) {
        const conversationCopy = [...conversation];
        conversationCopy.push(res.data.message);
        setConversation(conversationCopy);
        setSocketSendMessage({
          ...res.data.message,
          receiverId: selectedUser._id,
        });
      }

      // setSocketSendMessage({
      //   ...message,
      //   receiverId: selectedUser._id,
      // });
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.code === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onClickSendMessage();
    }
  };

  return (
    <Card
      extra={`!fixed bottom-0 right-[0px] sm:right-[20px] md:right-[12px] z-10  h-4/6 w-[270px] w-full origin-bottom-right transition-all duration-300 ease-in-out  sm:w-[460px] md:mr-4 dark:!bg-navy-700 ${
        selectedUser ? 'scale-100' : 'scale-0'
      }`}
    >
      <div className="flex h-full flex-col gap-3 rounded-[20px] bg-white py-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700">
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
        <div
          ref={messagesContainerRef}
          className="no-scrollbar py-7.5 max-h-full flex-1 space-y-3.5 overflow-auto px-6 text-navy-700 dark:text-white"
        >
          <AnimatePresence>
            {conversation.map((message, index) => (
              <motion.div
                key={message._id}
                layout
                initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
                animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
                transition={{
                  opacity: { duration: 0.1 },
                  layout: {
                    type: 'spring',
                    bounce: 0.3,
                    duration: conversation.indexOf(message) * 0.05 + 0.2,
                  },
                }}
                style={{
                  originX: 0.5,
                  originY: 0.5,
                }}
                // className={cn(
                //   "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                //   message.name !== selectedUser.name ? "items-end" : "items-start"
                // )}
              >
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
              </motion.div>
            ))}
          </AnimatePresence>
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
                className="max-h-16 min-h-4 overflow-y-auto overflow-x-hidden  border-0 text-sm outline-none 
                before:text-gray-700 dark:placeholder:!text-white 
                 dark:before:!text-white"
                style={{
                  userSelect: 'text',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
                ref={divRef}
                onKeyDown={handleKeyDown}
                data-lexical-editor="true"
                suppressContentEditableWarning={true}
                placeholder="Type message..."
              />
              {/* {text} */}
              {/* <p className="text-indent-0 mb-0 mt-0 select-text">
                  <span
                    className="selectable-text copyable-text"
                    data-lexical-text="true"
                  >
                    {content}
                  </span>
                </p> */}
              {/* </div> */}
            </div>
          </div>
          <span
            onClick={onClickSendMessage}
            className="inline cursor-pointer text-gray-700 dark:text-white"
          >
            <IoSend className="h-6 w-6" />
          </span>
        </div>
      </div>
    </Card>
  );
};

export default Conversation;
