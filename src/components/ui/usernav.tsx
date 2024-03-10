"use client"
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
import { useGetUserQuery } from '@/redux/api/usersApi';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

export default function UserNav() {
  const [user,setUser] = useState<any>({})

// const getUserById = async () => {
  // try {
    // setTimeout(()=>{
      const user_token = Cookies.get('access_token')
    console.log("user_token", typeof(user_token))
    const dataOfUser = useGetUserQuery(user_token ? user_token : '').data?.user
    console.log("Userdata",dataOfUser)
  // }, 5000)
  // } catch (error) {
    // console.error('Error fetching data:', error);
  // }
  
// }
//  setTimeout(()=>{
  // useEffect(()=>{
  //   if (Userdata){
  //     Userdata ? setUser(Userdata?.user) : ''
  //   } else {
  //     console.log("Userdata is null")
  //   }
  // },[])
// }, 5000)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={dataOfUser && dataOfUser.profilePicture} alt="@shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{dataOfUser && dataOfUser.firstName +' '+ dataOfUser.lastName}</p>
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
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
