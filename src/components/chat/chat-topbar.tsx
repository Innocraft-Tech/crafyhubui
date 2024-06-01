import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import Link from 'next/link';
import { Avatar, AvatarImage } from '../ui/avatar';
import { buttonVariants } from '../ui/button';
// import { UserData } from './data';

interface ChatTopbarProps {
  selectedUser: User;
  onlineUsers: OnlineUsers[];
  closeConversationModal?: () => void;
  widget?: boolean;
}

export const TopbarIcons = [
  // { icon: Phone },
  // { icon: Video },
  // { icon: Info },
  { icon: X, action: 'close' },
];

export default function ChatTopbar({
  selectedUser,
  onlineUsers,
  closeConversationModal,
  widget,
}: ChatTopbarProps) {
  if (!selectedUser) return;
  return (
    <div className="flex h-20 w-full items-center justify-between border-b p-4">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Avatar className="flex items-center justify-center">
            <AvatarImage
              src={selectedUser.profilePicture}
              alt={selectedUser.firstName + ' ' + selectedUser.lastName}
              width={6}
              height={6}
              className="h-10 w-10"
            />
          </Avatar>
          <span
            className={`absolute bottom-1 right-0 block h-2 w-2 rounded-full border-2 border-green-500 ${
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
        {TopbarIcons.map((icon, index) =>
          !widget && icon.action === 'close' ? null : (
            <Link
              key={index}
              href="#"
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                'h-9 w-9',
                'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
              )}
              onClick={(e) => {
                e.preventDefault();
                if (icon.action === 'close' && closeConversationModal)
                  closeConversationModal();
              }}
            >
              <icon.icon size={20} className="text-muted-foreground" />
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
