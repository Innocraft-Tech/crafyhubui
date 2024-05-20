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
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { removeToken } from '@/lib/cookie';
import { useGetUserQuery } from '@/redux/api/usersApi';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function UserNav() {
  const router = useRouter();
  const [user, setUser] = useState<any>({});

  const logout = () => {
    removeToken();
    router.push('/login');
  };

  const userToken = Cookies.get('access_token');
  const dataOfUser = useGetUserQuery(userToken ? userToken : '').data?.user;

  if (dataOfUser) {
    console.log('profile pic', dataOfUser);
  } else {
    console.log('User data is not available');
  }

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
              {/* {console.log(Userdata,"data in design")} */}
              {dataOfUser ? dataOfUser?.email : '@example.com'}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>New Team</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
