import React from 'react';
// Icon Imports
import { MdHome, MdLock, MdPerson } from 'react-icons/md';
import { PiBinocularsFill } from 'react-icons/pi';
import { TbMessageCircle2Filled } from 'react-icons/tb';

const routes = [
  {
    name: 'Dashboard',
    layout: '/user',
    path: 'dashboard',
    icon: <MdHome className="h-6 w-6" />,
  },
  {
    name: 'Discover',
    layout: '/user',
    path: 'discover',
    icon: <PiBinocularsFill className="h-6 w-6" />,
  },
  {
    name: 'Jobs',
    layout: '/user',
    path: 'jobs',
    icon: <TbMessageCircle2Filled className="h-6 w-6" />,
  },
  {
    name: 'Messages',
    layout: '/user',
    path: 'messages',
    icon: <TbMessageCircle2Filled className="h-6 w-6" />,
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: 'profile',
    icon: <MdPerson className="h-6 w-6" />,
  },
];
export default routes;
