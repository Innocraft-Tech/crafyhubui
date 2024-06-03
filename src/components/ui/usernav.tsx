'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { removeToken } from '@/lib/cookie';
import useUserInfo from '@/lib/hooks/useUserInfo';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UserNav() {
  const router = useRouter();

  const logout = () => {
    removeToken();
    router.push('/login');
  };

  const { userInfo: dataOfUser } = useUserInfo();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={dataOfUser && dataOfUser.profilePicture}
              alt="@shadcn"
            />
            <AvatarFallback>
              <AvatarImage
                src={dataOfUser && dataOfUser.profilePicture}
                alt="@shadcn"
              />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {dataOfUser && dataOfUser.firstName + ' ' + dataOfUser.lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {dataOfUser ? dataOfUser?.email : '@example.com'}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
          <Link href="/settings">
            <DropdownMenuItem>Settings</DropdownMenuItem>{' '}
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
