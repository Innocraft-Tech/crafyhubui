import { cn } from '@/lib/utils';
import { Info, Phone, Video } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarImage } from '../ui/avatar';
import { buttonVariants } from '../ui/button';
// import { UserData } from './data';

interface ChatTopbarProps {
  selectedUser: User;
  onlineUsers: OnlineUsers[];
}

export const TopbarIcons = [{ icon: Phone }, { icon: Video }, { icon: Info }];

export default function ChatTopbar({
  selectedUser,
  onlineUsers,
}: ChatTopbarProps) {
  if (!selectedUser) return;
  return (
    <div className="w-full h-20 flex p-4 justify-between items-center border-b">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Avatar className="flex justify-center items-center">
            <AvatarImage
              src={selectedUser.profilePicture}
              alt={selectedUser.firstName + ' ' + selectedUser.lastName}
              width={6}
              height={6}
              className="w-10 h-10 "
            />
          </Avatar>
          <span
            className={`absolute bottom-1 right-0 block h-2 w-2 rounded-full border-2 border-green-500  ${
              onlineUsers?.some(
                (onlineUser) => onlineUser.userId === selectedUser?._id,
              )
                ? 'bg-green-500'
                : 'bg-white'
            }`}
          ></span>
        </div>
        <div className="flex flex-col">
          <span className="font-medium">
            {selectedUser.firstName + ' ' + selectedUser.lastName}
          </span>
          {/* <span className="text-xs">Active 2 mins ago</span> */}
        </div>
      </div>

      <div>
        {TopbarIcons.map((icon, index) => (
          <Link
            key={index}
            href="#"
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'icon' }),
              'h-9 w-9',
              'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
            )}
          >
            <icon.icon size={20} className="text-muted-foreground" />
          </Link>
        ))}
      </div>
    </div>
  );
}
