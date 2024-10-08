import useUserInfo from '@/lib/hooks/useUserInfo';
import {
  useGetChatsQuery,
  useGetUserChatsQuery,
  useSendMessageMutation,
} from '@/redux/api/chatApi';
import { skipToken } from '@reduxjs/toolkit/query';
import React, { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { ChatList } from './chat-list';
import ChatTopbar from './chat-topbar';

interface ChatProps {
  //   messages?: Message[];
  selectedUser: User | null;
  isMobile: boolean;
  onlineUsers: OnlineUsers[];
  socket: Socket | null;
  closeConversationModal?: () => void;
  widget?: boolean;
  conversationLoading: boolean;
}

export function Chat({
  //   messages,
  selectedUser,
  isMobile,
  onlineUsers,
  socket,
  closeConversationModal,
  widget,
  conversationLoading,
}: ChatProps) {
  // const socket = useSocket(process.env.NEXT_PUBLIC_SERVER_SOCKET_URI || '');
  const [messagesState, setMessages] = React.useState<Message[]>([]);
  const [socketSendMessage, setSocketSendMessage] =
    useState<SocketMessage | null>(null);
  const [selectedChat, setSelectedChat] = React.useState<ChatResponse | null>(
    null,
  );

  const [sendMessage] = useSendMessageMutation();

  const { userInfo } = useUserInfo();
  const { data: userChats } = useGetUserChatsQuery(
    userInfo?._id ? userInfo._id : skipToken,
  );

  useEffect(() => {
    if (userChats && selectedUser) {
      const chat = userChats?.find((x) => x.members.includes(selectedUser._id));
      if (chat && selectedChat?._id !== chat?._id) setSelectedChat(chat);
    }
  }, [userChats, userInfo, selectedUser, selectedChat?._id]);

  const { data, isLoading, isFetching } = useGetChatsQuery(
    selectedChat?._id ? selectedChat._id : skipToken,
    { refetchOnMountOrArgChange: true },
  );

  useEffect(() => {
    if (userInfo?._id) {
      socket?.on('recieve-message', (data: SocketMessage) => {
        setMessages((prevState) => [...prevState, data]);
      });
    }
  }, [userInfo, socket]);

  // useEffect(() => {
  //   if (selectedChat) {
  //     refetch();
  //   }
  // }, [selectedChat]);

  // Send Message to socket server
  useEffect(() => {
    if (socketSendMessage !== null) {
      socket?.emit('send-message', socketSendMessage);
    }
  }, [socketSendMessage, socket]);

  useEffect(() => {
    if (data) {
      setMessages(data.messages);
    }
  }, [data]);

  const onClickSendMessage = (text: string) => {
    const message = {
      chatId: selectedChat?._id || '',
      senderId: userInfo?._id || '',
      text,
    };

    sendMessage(message).then((res) => {
      if ('data' in res) {
        const conversationCopy = [...messagesState];
        conversationCopy.push(res.data.message);
        setMessages(conversationCopy);
        setSocketSendMessage({
          ...res.data.message,
          receiverId: selectedUser?._id,
        });
      }

      // setSocketSendMessage({
      //   ...message,
      //   receiverId: selectedUser._id,
      // });
    });

    // setMessages([...messagesState, newMessage]);
  };

  if (!selectedUser) return;

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <ChatTopbar
        selectedUser={selectedUser}
        onlineUsers={onlineUsers}
        closeConversationModal={closeConversationModal}
        widget={widget}
      />

      <ChatList
        messages={messagesState}
        selectedUser={selectedUser}
        sendMessage={onClickSendMessage}
        isMobile={isMobile}
        isLoadingChat={isFetching || isLoading || conversationLoading}
      />
    </div>
  );
}
