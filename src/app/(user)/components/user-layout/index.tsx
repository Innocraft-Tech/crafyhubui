'use client';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/ui/sidebar';
import UserNav from '@/components/ui/usernav';
import { playlists } from '@/data/playlists';
import { getActiveRoute } from '@/lib/navigation';
import routes from '@/routes';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { FiAlignJustify } from 'react-icons/fi';
import AppWrappers from '../app-wrappers/app-wrappers';

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <div className=" md:block">
        <div className="border-t">
          <div className="bg-background">
            <div className="flex h-full w-full">
              <Sidebar
                playlists={playlists}
                open={open}
                setOpen={setOpen}
                routes={routes}
                verified={false}
              />

              <div className="h-full w-full overflow-auto ">
                <main
                  className={`flex-none transition-all
              xl:ml-[253px]`}
                >
                  <div className="h-lvh z-20">
                    <div className="z-30 ">
                      <div className="flex justify-between items-center border-b bg-stone-50">
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
                          <Button variant="ghost">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="#000000"
                              viewBox="0 0 256 256"
                            >
                              <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
                            </svg>
                          </Button>
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
