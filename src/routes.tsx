// Icon Imports
import { AiOutlineMessage } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { IoHomeOutline } from 'react-icons/io5';
import { MdWorkOutline } from 'react-icons/md';
import { RiCompassDiscoverLine } from 'react-icons/ri';

const routes = [
  {
    name: 'Dashboard',
    layout: '/user',
    path: '/dashboard',
    icon: <IoHomeOutline className="h-6 w-6" />,
  },
  {
    name: 'Discover',
    layout: '/user',
    path: '/discover',
    icon: <RiCompassDiscoverLine className="h-6 w-6" />,
  },
  {
    name: 'Jobs',
    layout: '/user',
    path: '/jobs',
    icon: <MdWorkOutline className="h-6 w-6" />,
  },
  {
    name: 'Messages',
    layout: '/user',
    path: '/messages',
    icon: <AiOutlineMessage className="h-6 w-6" />,
  },
  {
    name: 'Profile',
    layout: '/admin',
    path: 'profile',
    icon: <CgProfile className="h-6 w-6" />,
  },
];
export default routes;
