/* eslint-disable prettier/prettier */

'use client';
import Conversation from '@/components/chat/conversation';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import useSocket from '@/lib/hooks/useSocket';
import useUserInfo from '@/lib/hooks/useUserInfo';
import { useGetAllUsersQuery } from '@/redux/api/usersApi';
import { LoaderIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { ProjectSlider } from './projectsslider';
interface DiscoverCardProps {
  category: string[];
  roles: string[]; // Array of strings
  locationAray: string[];
}
export const DiscoverCard: React.FC<DiscoverCardProps> = ({
  category,
  roles,
}): JSX.Element => {
  const socket = useSocket(process.env.NEXT_PUBLIC_SERVER_SOCKET_URI || '');
  const [onlineUsers, setOnlineUsers] = useState<OnlineUsers[]>([]);
  const { data, isLoading } = useGetAllUsersQuery();
  const { users: userData } = data || {};
  const [conversationModal, setConversationModal] = useState<User | null>(null);

  const { userInfo } = useUserInfo();

  const openConversationModal = (user: User) => {
    setConversationModal(user);
  };

  const closeConversationModal = () => {
    setConversationModal(null);
  };

  useEffect(() => {
    if (userInfo?._id) {
      socket?.emit('new-user-add', userInfo?._id);
      socket?.on('get-users', (users) => {
        setOnlineUsers(users);
      });
    }
  }, [userInfo, socket]);

  if (isLoading) {
    return (
      <div className="flex min-h-[75vh] items-center justify-center">
        <LoaderIcon className="my-28 h-16 w-16 animate-spin text-primary/60" />
      </div>
    );
  }
  const filteredUsers = userData?.filter((user) => {
    // Normalize user tools data
    const userTools = user.tools.map((tool) => tool.toLowerCase());
    const normalizedCategories = category.map((cat) => cat.toLowerCase()); // Assuming category IDs are in lowercase
    const normalizedRoles = roles.map((role) => role.toLowerCase());

    // Check if user has matching categories
    const hasMatchingCategory =
      normalizedCategories.length === 0 ||
      normalizedCategories.some((cat) => userTools.includes(cat));

    // Check if user has matching roles
    const hasMatchingRole =
      normalizedRoles.length === 0 ||
      normalizedRoles.some((role) => userTools.includes(role));

    // Include users that meet either category or role criteria
    return hasMatchingCategory && hasMatchingRole;
  });
  return (
    <>
      <Conversation
        user={conversationModal}
        closeConversationModal={closeConversationModal}
        onlineUsers={onlineUsers}
        socket={socket}
      />
      <div className="px-5 py-5">
        <div className="mx-2 grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {filteredUsers?.map((user, index) => {
            if (userInfo?._id === user._id) return null;
            const userExists = onlineUsers?.some(
              (activeUser) => activeUser.userId === user._id,
            );

            return (
              <Card key={index} className="rounded-2xl px-2 py-2">
                <div className="flex items-center">
                  <div className="relative">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={user.profilePicture}
                        alt="@shadcn"
                        className="object-cover"
                      />
                      <AvatarFallback>{`${user.firstName?.charAt(
                        0,
                      )}${user.lastName?.charAt(0)}`}</AvatarFallback>
                    </Avatar>
                    <span
                      className={`absolute bottom-3 right-0 block h-2 w-2 rounded-full border-2 border-green-500 ${
                        userExists ? 'bg-green-500' : 'bg-white'
                      }`}
                    ></span>
                  </div>
                  <div className="mx-3">
                    <h4 className="font-medium">
                      {user.firstName} {user.lastName}
                      {/* {user.email} */}
                    </h4>
                    <span className="font-light">
                      {user.userLocation?.join(', ')}
                    </span>
                  </div>
                </div>
                <div className="my-5 flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="p-2 text-xs font-normal sm:p-1 sm:px-2 2xl:p-2"
                  >
                    {user.perHourValue?.length > 0
                      ? `${user.perHourValue.join('-')}`
                      : '-'}{' '}
                    / hr
                  </Badge>
                  {/* <Badge
                    // variant="secondary"
                    variant="outline"
                    className={`p-2 font-normal ${userExists ? 'bg-green-300' : 'border-green-300'}`}
                  >
                    {userExists ? 'Available' : 'Not Available'}
                  </Badge> */}
                </div>
                <div className="grid grid-cols-1 gap-1 text-xs sm:grid-cols-3">
                  {user.tools.slice(0, 2).map((tool: string, index: number) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="item flex-1 justify-center rounded-md p-2 text-center text-xs font-normal sm:p-0 2xl:p-2"
                    >
                      {tool}
                    </Badge>
                  ))}
                  {user.tools.length > 2 && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="secondary">
                          +{user.tools.length - 2}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="h-auto w-auto">
                        {user.tools.length > 2 &&
                          user.tools.slice(2).map((tool, index) => (
                            <div className="grid grid-flow-col" key={index + 2}>
                              <p className="item flex-1 justify-center text-center text-sm font-normal sm:p-0 2xl:p-2">
                                {tool}
                              </p>
                            </div>
                          ))}
                      </PopoverContent>
                    </Popover>
                  )}
                </div>
                <div className="project-carousel my-3">
                  <ProjectSlider />
                </div>
                <Button
                  variant="default"
                  className="my-3 w-full rounded-xl"
                  onClick={() => openConversationModal(user)}
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
                  </svg>
                  Get In Touch
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
};
