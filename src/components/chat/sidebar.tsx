'use client';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MoreHorizontal, SquarePen } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarImage } from '../ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

interface SidebarProps {
  isCollapsed: boolean;
  //   links: {
  //     name: string;
  //     messages: Message[];
  //     avatar: string;
  //     variant: 'grey' | 'ghost';
  //   }[];
  links: User[];
  //   onClick?: () => void;
  setSelectedUser: (user: User) => void;
  isMobile: boolean;
  selectedUser: User | null;
  onlineUsers: OnlineUsers[];
}

export function Sidebar({
  links,
  isCollapsed,
  isMobile,
  setSelectedUser,
  selectedUser,
  onlineUsers,
}: SidebarProps) {
  const getVariant = (user: User) =>
    selectedUser?._id === user._id ? 'grey' : 'ghost';

  return (
    <div
      data-collapsed={isCollapsed}
      className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 "
    >
      {!isCollapsed && (
        <div className="flex justify-between p-2 items-center">
          <div className="flex gap-2 items-center text-2xl">
            <p className="font-medium">Chats</p>
            <span className="text-zinc-300">({links?.length})</span>
          </div>

          <div>
            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                'h-9 w-9',
              )}
            >
              <MoreHorizontal size={20} />
            </Link>

            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                'h-9 w-9',
              )}
            >
              <SquarePen size={20} />
            </Link>
          </div>
        </div>
      )}
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links?.map((link, index) =>
          isCollapsed ? (
            <TooltipProvider key={index}>
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href="#"
                    className={cn(
                      buttonVariants({
                        variant: getVariant(link),
                        size: 'icon',
                      }),
                      'h-11 w-11 md:h-16 md:w-16',
                      getVariant(link) === 'grey' &&
                        'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
                    )}
                    onClick={() => setSelectedUser(link)}
                  >
                    <Avatar className="flex justify-center items-center">
                      <AvatarImage
                        src={link.profilePicture}
                        alt={link.profilePicture}
                        width={6}
                        height={6}
                        className="w-10 h-10 "
                      />
                    </Avatar>
                    <span className="sr-only">
                      {link.firstName + ' ' + link.lastName}
                    </span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.firstName + ' ' + link.lastName}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Link
              key={index}
              href="#"
              className={cn(
                buttonVariants({ variant: getVariant(link), size: 'xl' }),
                getVariant(link) === 'grey' &&
                  'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white shrink',
                'justify-start gap-4',
              )}
              onClick={() => setSelectedUser(link)}
            >
              <div className="relative">
                <Avatar className="flex justify-center items-center">
                  <AvatarImage
                    src={link.profilePicture}
                    alt={link.profilePicture}
                    width={6}
                    height={6}
                    className="w-10 h-10 "
                  />
                </Avatar>
                <span
                  className={`absolute bottom-1 right-0 block h-2 w-2 rounded-full border-2 border-green-500  ${
                    onlineUsers?.some(
                      (onlineUser) => onlineUser.userId === link?._id,
                    )
                      ? 'bg-green-500'
                      : 'bg-white'
                  }`}
                ></span>
              </div>
              <div className="flex flex-col max-w-28">
                <span>{link.firstName + ' ' + link.lastName}</span>
                {/* {link.messages?.length > 0 && (
                  <span className="text-zinc-300 text-xs truncate ">
                    {link.messages[link.messages.length - 1].name.split(' ')[0]}
                    : {link.messages[link.messages.length - 1].message}
                  </span>
                )} */}
              </div>
            </Link>
          ),
        )}
      </nav>
    </div>
  );
}
