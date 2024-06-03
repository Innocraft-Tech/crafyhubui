'use client';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/ui/sidebar';
import UserNav from '@/components/ui/usernav';
import { playlists } from '@/data/playlists';
import useUserInfo from '@/lib/hooks/useUserInfo';
import { getActiveRoute } from '@/lib/navigation';
import routes from '@/routes';
import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FiAlignJustify } from 'react-icons/fi';
import AppWrappers from '../app-wrappers/app-wrappers';
import Link from 'next/link';

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const pathname = usePathname();

  const { userInfo } = useUserInfo();

  if (userInfo && !userInfo.isVerified) redirect('/verification');

  useEffect(() => {
    const checkScreenWidth = () => {
      setOpen(false);
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
    <>
      <div className="md:block">
        <div className="border-t">
          <div className="bg-background">
            <div className="flex h-full w-full">
              <Sidebar
                playlists={playlists}
                open={open}
                setOpen={setOpen}
                routes={routes}
                verified={false}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
              />

              <div className="h-full w-full overflow-auto">
                <main
                  className={`flex-none transition-all ${collapsed ? 'xl:ml-[80px]' : 'xl:ml-[253px]'}`}
                >
                  <div className="z-20 h-lvh">
                    <div className="z-30">
                      <div className="flex items-center justify-between border-b bg-stone-50">
                        <div className="topHeadings p-5">
                          <AppWrappers>
                            <h3 className="text-lg">
                              {getActiveRoute(routes, pathname)}
                            </h3>
                          </AppWrappers>
                        </div>
                        <div className="righ-nav flex items-center px-5">
                          <span
                            className="flex cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
                            onClick={() => setOpen(!open)}
                          >
                            <FiAlignJustify className="h-5 w-5" />
                          </span>
                          <Link href="/messages">
                            <Button variant="ghost">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="#000000"
                                viewBox="0 0 256 256"
                              >
                                <path d="M140,128a12,12,0,1,1-12-12A12,12,0,0,1,140,128ZM84,116a12,12,0,1,0,12,12A12,12,0,0,0,84,116Zm88,0a12,12,0,1,0,12,12A12,12,0,0,0,172,116Zm60,12A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-16,0A88,88,0,1,0,51.81,172.06a8,8,0,0,1,.66,6.54L40,216,77.4,203.53a7.85,7.85,0,0,1,2.53-.42,8,8,0,0,1,4,1.08A88,88,0,0,0,216,128Z"></path>
                              </svg>
                            </Button>
                          </Link>

                          <UserNav />
                        </div>
                      </div>
                    </div>
                    {children}
                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
