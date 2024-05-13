'use client';
import NavLink from '@/app/(user)/components/link/NavLink';
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
import { RoutesType } from '@/data/navigation';
import { Playlist } from '@/data/playlists';
import useUserInfo from '@/lib/hooks/useUserInfo';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { HiX } from 'react-icons/hi';
import { LuLayoutDashboard } from 'react-icons/lu';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: Playlist[];
  open: boolean;
  setOpen: (value: boolean) => void;
  routes: RoutesType[];
}

export function Sidebar({ className, routes, open, setOpen }: SidebarProps) {
  const { userInfo: dataOfUser } = useUserInfo();
  const pathname = usePathname();

  // const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = useCallback(
    (routeName: string) => {
      return pathname?.includes(routeName);
    },
    [pathname],
  );

  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? 'translate-x-0' : '-translate-x-96 xl:translate-x-0'
      }`}
    >
      <span
        className="absolute right-4 top-4 block cursor-pointer xl:hidden"
        onClick={() => setOpen(false)}
      >
        <HiX />
      </span>
      <div className={cn('pb-12', 'h-lvh', className)}>
        <div className="space-y-4 py-4">
          <div className="py-2">
            <div className=" flex mx-3 px-4 items-center justify-start mb-8">
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 8.57143C0 3.83756 3.83756 0 8.57143 0H27.4286C32.1624 0 36 3.83756 36 8.57143V27.4286C36 32.1624 32.1624 36 27.4286 36H8.57143C3.83756 36 0 32.1624 0 27.4286V8.57143Z"
                  fill="#FF0055"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M27.4286 1.02857H8.57143C4.40562 1.02857 1.02857 4.40562 1.02857 8.57143V27.4286C1.02857 31.5944 4.40562 34.9714 8.57143 34.9714H27.4286C31.5944 34.9714 34.9714 31.5944 34.9714 27.4286V8.57143C34.9714 4.40562 31.5944 1.02857 27.4286 1.02857ZM8.57143 0C3.83756 0 0 3.83756 0 8.57143V27.4286C0 32.1624 3.83756 36 8.57143 36H27.4286C32.1624 36 36 32.1624 36 27.4286V8.57143C36 3.83756 32.1624 0 27.4286 0H8.57143Z"
                  fill="#FF0055"
                />
                <path
                  opacity="0.5"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22.2861 10.3024C22.2861 11.4477 21.345 12.3762 20.184 12.3762L19.3409 12.3762C15.9046 12.3762 13.119 15.1243 13.119 18.5143C13.119 21.9043 15.9046 24.6524 19.3409 24.6524L19.7133 24.6524C20.8743 24.6524 21.8155 25.5808 21.8155 26.7262C21.8155 27.8715 20.8743 28.8 19.7133 28.8L19.3409 28.8C13.5827 28.8 8.9147 24.1949 8.9147 18.5143C8.9147 12.8336 13.5827 8.22857 19.3409 8.22858L20.184 8.22858C21.345 8.22858 22.2861 9.15706 22.2861 10.3024Z"
                  fill="white"
                />
                <path
                  opacity="0.7"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M23.6572 10.3024C23.6572 11.4477 22.7161 12.3762 21.5551 12.3762L20.712 12.3762C17.2757 12.3762 14.4901 15.1243 14.4901 18.5143C14.4901 21.9043 17.2757 24.6524 20.712 24.6524L21.0844 24.6524C22.2454 24.6524 23.1866 25.5808 23.1866 26.7262C23.1866 27.8715 22.2454 28.8 21.0844 28.8L20.712 28.8C14.9538 28.8 10.2858 24.1949 10.2858 18.5143C10.2858 12.8336 14.9538 8.22857 20.712 8.22858L21.5551 8.22858C22.7161 8.22858 23.6572 9.15706 23.6572 10.3024Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M25.0283 10.3024C25.0283 11.4477 24.1113 12.3762 22.9801 12.3762L22.1586 12.3762C18.8105 12.3762 16.0962 15.1243 16.0962 18.5143C16.0962 21.9043 18.8105 24.6524 22.1586 24.6524L22.5215 24.6524C23.6527 24.6524 24.5697 25.5808 24.5697 26.7262C24.5697 27.8715 23.6527 28.8 22.5215 28.8L22.1586 28.8C16.548 28.8 11.9998 24.1949 11.9998 18.5143C11.9998 12.8336 16.548 8.22857 22.1586 8.22858L22.9801 8.22858C24.1113 8.22858 25.0283 9.15706 25.0283 10.3024Z"
                  fill="white"
                />
              </svg>
              <span className="px-3 text-lg font-semibold tracking-tight">
                CrafyHub
              </span>
            </div>
            <div className=" flex mx-3 px-4 items-center justify-start mb-8">
              <div className="flex items-center space-x-4 ">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={dataOfUser && dataOfUser.profilePicture}
                          alt="@shadcn"
                        />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56 mx-2"
                    align="end"
                    forceMount
                  >
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {dataOfUser &&
                            dataOfUser.firstName + ' ' + dataOfUser.lastName}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
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
                      <Link href="/settings">
                        <DropdownMenuItem>
                          Settings
                          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem>New Team</DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      Log out
                      <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {dataOfUser &&
                      dataOfUser.firstName + ' ' + dataOfUser.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {dataOfUser && dataOfUser.tools[0]}
                  </p>
                </div>
              </div>
            </div>
            {/* <div className="space-y-1">
              <Link href="/dashboard">
                <Button variant="secondary" className="w-full justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="mr-2"
                    fill="#000000"
                    viewBox="0 0 256 256"
                  >
                    <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z"></path>
                  </svg>
                  Home
                </Button>
              </Link>
              <Link href="/discover">
                <Button variant="ghost" className="w-full justify-start">
                  <LuLayoutDashboard className="h-5 w-5 mr-2" />
                  Discover
                </Button>
              </Link>
              <div className="shrink-0 bg-border h-[1px] w-full"></div>
              <Link href="/jobs">
                <Button variant="ghost" className="w-full justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="mr-2"
                    fill="#000000"
                    viewBox="0 0 256 256"
                  >
                    <path d="M210.78,39.25l-130.25-23A16,16,0,0,0,62,29.23l-29.75,169a16,16,0,0,0,13,18.53l130.25,23h0a16,16,0,0,0,18.54-13l29.75-169A16,16,0,0,0,210.78,39.25ZM178.26,224h0L48,201,77.75,32,208,55ZM89.34,58.42a8,8,0,0,1,9.27-6.48l83,14.65a8,8,0,0,1-1.39,15.88,8.36,8.36,0,0,1-1.4-.12l-83-14.66A8,8,0,0,1,89.34,58.42ZM83.8,89.94a8,8,0,0,1,9.27-6.49l83,14.66A8,8,0,0,1,174.67,114a7.55,7.55,0,0,1-1.41-.13l-83-14.65A8,8,0,0,1,83.8,89.94Zm-5.55,31.51A8,8,0,0,1,87.52,115L129,122.29a8,8,0,0,1-1.38,15.88,8.27,8.27,0,0,1-1.4-.12l-41.5-7.33A8,8,0,0,1,78.25,121.45Z"></path>
                  </svg>
                  Jobs
                </Button>
              </Link>
              <Link href="/project-invoices">
                <Button variant="ghost" className="w-full justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="mr-2"
                    fill="#000000"
                    viewBox="0 0 256 256"
                  >
                    <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z"></path>
                  </svg>
                  Projects & Invoices
                </Button>
              </Link>
              <Link href="/files">
                <div className="shrink-0 bg-border h-[1px] w-full"></div>
                <Button variant="ghost" className="w-full justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="mr-2"
                    fill="#000000"
                    viewBox="0 0 256 256"
                  >
                    <path d="M245,110.64A16,16,0,0,0,232,104H216V88a16,16,0,0,0-16-16H130.67L102.94,51.2a16.14,16.14,0,0,0-9.6-3.2H40A16,16,0,0,0,24,64V208h0a8,8,0,0,0,8,8H211.1a8,8,0,0,0,7.59-5.47l28.49-85.47A16.05,16.05,0,0,0,245,110.64ZM93.34,64l27.73,20.8a16.12,16.12,0,0,0,9.6,3.2H200v16H69.77a16,16,0,0,0-15.18,10.94L40,158.7V64Zm112,136H43.1l26.67-80H232Z"></path>
                  </svg>
                  Files
                </Button>
              </Link>
              <Link href="/stats">
                <Button variant="ghost" className="w-full justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="mr-2"
                    fill="#000000"
                    viewBox="0 0 256 256"
                  >
                    <path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0v94.37L90.73,98a8,8,0,0,1,10.07-.38l58.81,44.11L218.73,90a8,8,0,1,1,10.54,12l-64,56a8,8,0,0,1-10.07.38L96.39,114.29,40,163.63V200H224A8,8,0,0,1,232,208Z"></path>
                  </svg>
                  Stats
                </Button>
              </Link>
              <div className="shrink-0 bg-border h-[1px] w-full"></div>
              <Button variant="ghost" className="w-full justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  className="mr-2"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path d="M216,72H56a8,8,0,0,1,0-16H192a8,8,0,0,0,0-16H56A24,24,0,0,0,32,64V192a24,24,0,0,0,24,24H216a16,16,0,0,0,16-16V88A16,16,0,0,0,216,72Zm0,128H56a8,8,0,0,1-8-8V86.63A23.84,23.84,0,0,0,56,88H216Zm-48-60a12,12,0,1,1,12,12A12,12,0,0,1,168,140Z"></path>
                </svg>
                Wallet
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  className="mr-2"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path d="M168,56a8,8,0,0,1,8-8h16V32a8,8,0,0,1,16,0V48h16a8,8,0,0,1,0,16H208V80a8,8,0,0,1-16,0V64H176A8,8,0,0,1,168,56Zm62.56,54.68a103.92,103.92,0,1,1-85.24-85.24,8,8,0,0,1-2.64,15.78A88.07,88.07,0,0,0,40,128a87.62,87.62,0,0,0,22.24,58.41A79.66,79.66,0,0,1,98.3,157.66a48,48,0,1,1,59.4,0,79.66,79.66,0,0,1,36.06,28.75A87.62,87.62,0,0,0,216,128a88.85,88.85,0,0,0-1.22-14.68,8,8,0,1,1,15.78-2.64ZM128,152a32,32,0,1,0-32-32A32,32,0,0,0,128,152Zm0,64a87.57,87.57,0,0,0,53.92-18.5,64,64,0,0,0-107.84,0A87.57,87.57,0,0,0,128,216Z"></path>
                </svg>
                Referral Program
              </Button>
            </div> */}
            {routes.map((route, index) => (
              <NavLink
                key={index}
                href={route.path}
                className="flex items-center justify-start "
              >
                <div
                  className={`rounded-md relative mb-3 flex hover:cursor-pointer  hover:bg-accent/30 hover:text-accent-foreground w-full                  
                  `}
                >
                  <li
                    className="my-[3px] mx-3 text-sm  font-medium flex cursor-pointer items-center px-4 mr-24"
                    key={index}
                  >
                    <span
                      className={`${
                        activeRoute(route.path) === true
                          ? 'text-brand-500'
                          : ' '
                      }`}
                    >
                      {route.icon}{' '}
                    </span>
                    <p
                      className={`leading-1 ml-4 flex ${
                        activeRoute(route.path) === true
                          ? 'text-secondary-foreground'
                          : ''
                      }`}
                    >
                      {route.name}
                    </p>
                  </li>
                  {activeRoute(route.path) ? (
                    <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-brand-500" />
                  ) : null}
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
