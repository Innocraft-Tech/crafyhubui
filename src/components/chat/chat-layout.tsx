'use client';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import useSocket from '@/lib/hooks/useSocket';
import useUserInfo from '@/lib/hooks/useUserInfo';
import { cn } from '@/lib/utils';
import { useGetUserChatsQuery } from '@/redux/api/chatApi';
import { useGetAllUsersQuery } from '@/redux/api/usersApi';
import { skipToken } from '@reduxjs/toolkit/query';
import React, { useEffect, useState } from 'react';
import { Chat } from './chat';
import { Sidebar } from './sidebar';

interface ChatLayoutProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function ChatLayout({
  defaultLayout = [320, 480],
  defaultCollapsed = false,
  navCollapsedSize,
}: ChatLayoutProps) {
  const socket = useSocket(process.env.NEXT_PUBLIC_SERVER_SOCKET_URI || '');
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const [filteredUserChats, setFilteredUserChats] = React.useState<User[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUsers[]>([]);

  const { userInfo } = useUserInfo();

  const { data: allUsers, isError, isLoading } = useGetAllUsersQuery();
  const { users } = allUsers || {};

  const { data: userChats } = useGetUserChatsQuery(
    userInfo?._id ? userInfo._id : skipToken,
  );

  useEffect(() => {
    if (userInfo && allUsers && userChats) {
      const filteredUsers = users?.filter((x: User) => {
        return userChats?.some(
          (y: ChatResponse) =>
            x._id !== userInfo?._id && y?.members.includes(x._id),
        );
      });
      if (filteredUsers?.length) {
        setFilteredUserChats(filteredUsers);
        if (!selectedUser) setSelectedUser(filteredUsers[0]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo, userChats, allUsers]);

  useEffect(() => {
    if (userInfo?._id) {
      socket?.emit('new-user-add', userInfo?._id);
      socket?.on('get-users', (users) => {
        setOnlineUsers(users);
      });
    }
  }, [userInfo, socket]);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkScreenWidth();

    // Event listener for screen width changes
    window.addEventListener('resize', checkScreenWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, []);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes,
        )}`;
      }}
      className="h-full items-stretch"
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={isMobile ? 0 : 24}
        maxSize={isMobile ? 8 : 30}
        onCollapse={() => {
          setIsCollapsed(true);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            true,
          )}`;
        }}
        onExpand={() => {
          setIsCollapsed(false);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            false,
          )}`;
        }}
        className={cn(
          isCollapsed &&
            'min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out',
        )}
      >
        <Sidebar
          isCollapsed={isCollapsed || isMobile}
          //   links={filteredUserChats?.map((user, index) => ({
          //     name: user.firstName + ' ' + user.lastName,
          //     // messages: user.messages ?? [],
          //     avatar: user.profilePicture,
          //     variant: selectedUser?._id === user._id ? 'grey' : 'ghost',
          //   }))}
          links={filteredUserChats}
          isMobile={isMobile}
          setSelectedUser={setSelectedUser}
          selectedUser={selectedUser}
          onlineUsers={onlineUsers}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        <Chat
          //   messages={selectedUser?.messages}
          selectedUser={selectedUser}
          isMobile={isMobile}
          onlineUsers={onlineUsers}
          socket={socket}
          conversationLoading={false}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
