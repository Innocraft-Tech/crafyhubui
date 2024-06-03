import { cn } from '@/lib/utils';
import { useGetAllUsersQuery } from '@/redux/api/usersApi';
import { AnimatePresence, motion } from 'framer-motion';
import { LoaderIcon } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { Avatar, AvatarImage } from '../ui/avatar';
import ChatBottombar from './chat-bottombar';

interface ChatListProps {
  messages?: Message[];
  selectedUser: User;
  sendMessage: (text: string) => void;
  isMobile: boolean;
  isLoadingChat: boolean;
}

export function ChatList({
  messages,
  selectedUser,
  sendMessage,
  isMobile,
  isLoadingChat,
}: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const [receivedUser, setReceivedUser] = useState<User | null>(null);

  const { data: allUsers, isError, isLoading } = useGetAllUsersQuery();
  const { users } = allUsers || {};

  React.useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const getUser = (senderId: string) => {
    const user = users?.find((x: User) => x._id === senderId);

    if (user) setReceivedUser(user);
    return user ? user.profilePicture : '';
  };

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden">
      <div
        ref={messagesContainerRef}
        className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden"
      >
        <AnimatePresence>
          {isLoadingChat ? (
            <div className="flex items-center justify-center">
              <LoaderIcon className="my-28 h-16 w-16 animate-spin text-primary/60" />
            </div>
          ) : (
            messages?.map((message, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
                animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
                transition={{
                  opacity: { duration: 0.1 },
                  layout: {
                    type: 'spring',
                    bounce: 0.3,
                    duration: messages.indexOf(message) * 0.05 + 0.2,
                  },
                }}
                style={{
                  originX: 0.5,
                  originY: 0.5,
                }}
                className={cn(
                  'flex flex-col gap-2 whitespace-pre-wrap p-4',
                  message.senderId !== selectedUser._id
                    ? 'items-end'
                    : 'items-start',
                )}
              >
                <div className="flex items-center gap-3">
                  {message.senderId === selectedUser._id && (
                    <Avatar className="flex items-center justify-center">
                      <AvatarImage
                        src={selectedUser.profilePicture}
                        alt={
                          selectedUser.firstName + ' ' + selectedUser.lastName
                        }
                        width={6}
                        height={6}
                      />
                    </Avatar>
                  )}
                  <span className="max-w-xs rounded-md bg-accent p-3">
                    {message.text}
                  </span>
                  {message.senderId !== selectedUser._id && (
                    <Avatar className="flex items-center justify-center">
                      <AvatarImage
                        //   src={selectedUser.profilePicture}
                        src={
                          receivedUser?.profilePicture ||
                          getUser(message.senderId)
                        }
                        alt={
                          selectedUser.firstName + ' ' + selectedUser.lastName
                        }
                        width={6}
                        height={6}
                      />
                    </Avatar>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
      <ChatBottombar sendMessage={sendMessage} isMobile={isMobile} />
    </div>
  );
}
