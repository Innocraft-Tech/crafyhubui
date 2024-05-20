'use client';

import * as React from 'react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
// import { Icons } from '@/components/icons';
// import { Icons } from '@/components/icons';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Icons } from '@/components/ui/icon';

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
    description:
      'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
    description:
      'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
];
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
interface props {
  values: {
    title: string;
    minRate: string;
    maxRate: string;
    skills: string[];
    tools: string[];
    jobDetails: string;
    timeZone: string;
  };
}
export function NavigationMenuDemo({ values }: props) {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 w-full  border">
      <div className=" sm:flex flex-wrap  items-center justify-between w-full  mx-auto p-4">
        
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Job details
          </span>
      
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-2 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-3 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className=" text-xs px-5 py-2 border-2 rounded-[50px]">
                    cancel
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      <button>Exit job creation?</button>
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                      Your job will be saved privately to your account. You can
                      continue editing at any time.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Link href="/jobs">
                      <AlertDialogAction>Exit Job Creation</AlertDialogAction>
                    </Link>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </li>
            <li>
              <Separator orientation="vertical" className=" " />
            </li>

            <li>
              {/* <button className='text-xs px-5 py-2  border-2 rounded-[50px]'> preview</button>  */}

              <Dialog>
                <DialogTrigger asChild>
                  <button className="text-xs px-5 py-2  border-2 rounded-[50px]">
                    {' '}
                    preview
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[525px] ">
                  <DialogHeader className="my-2">
                    <DialogTitle>
                      This is a preview of what candidates will see.
                    </DialogTitle>
                    <DialogDescription>Ongoing.</DialogDescription>
                  </DialogHeader>
                  <div className=" py-4">
                    <p className="w-full text-2xl font-bold ">{values.title}</p>
                    <p className=" my-3 text-sm font-medium border px-4 rounded-[50px] py-2 inline-block">
                      {' '}
                      $ {values.maxRate} - {values.minRate}
                    </p>
                    <div className=" grid grid-cols-3 my-5 place-content-center items-center ">
                      {values.skills.map((skill, index) => (
                        <Badge
                          key={index}
                          className=" border rounded-[5px]  text-xs text-center mx-1 my-2"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {values.tools &&
                        values.tools.map((skill, index) => (
                          // <li key={index} className='text-xs list-none my-2 text-center  font-medium  border-2 rounded-[50px]'> {skill}</li>
                          <Badge
                            key={index}
                            className=" border rounded-[5px]  text-xs text-center mx-1 my-2"
                          >
                            {skill}
                          </Badge>
                        ))}
                    </div>
                    <div className=" grid grid-cols-1 ">
                      <p className=" font-bold my-4"> Job Details </p>
                      <p className=" w-auto  text-xs overflow-clip">
                        {values.jobDetails}
                      </p>
                      <p className=" font-bold  my-4"> Time Zone</p>

                      <p>{values.timeZone}</p>
                    </div>
                  </div>
                  <DialogFooter></DialogFooter>
                </DialogContent>
              </Dialog>
            </li>

            <li>
              <button className=" bg-black text-white text-xs  px-6 py-2  border-2 rounded-[50px]">
                Save
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
