import Card from 'components/card';
import React from 'react';
import Image from 'next/image';
import { PiTelegramLogoFill } from 'react-icons/pi';
import { Avatar, Tag } from '@chakra-ui/react';
import AvatarFallback from './AvatarFallback';

const UserCard = (user, index) => {
  const { user: userData } = user;

  return (
    <Card extra="!px-[20px] text-center py-[16px] bg-cover">
      {/* Background and profile */}
      <div className="relative mt-1 flex w-full justify-center rounded-xl">
        <div className="flex h-[87px] w-[87px] items-center justify-center rounded-full border-[0px] border-white bg-lightPrimary  dark:bg-navy-700">
          <AvatarFallback userData={userData} />
        </div>
      </div>

      {/* Name and position */}
      <div className="mt-4 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {userData.firstName} {userData.lastName}
        </h4>
        <h5 className="text-base font-normal text-gray-600">
          {userData.userLocation || ' '}
        </h5>
      </div>

      <div className="mt-2 flex items-center justify-center">
        <div className=" flex items-center  text-sm ">
          {userData.tools.map((tool: String, index: number) => (
            <span
              key={index}
              className="me-2  rounded-full bg-lightPrimary px-2.5 py-0.5 text-navy-700 transition duration-200 hover:cursor-pointer hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-900 dark:text-white dark:hover:opacity-90 dark:active:opacity-80"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-3 mt-4 flex gap-4 text-center md:!gap-14">
        <button className="linear w-full rounded-[20px] bg-brand-600 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-700 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:opacity-90">
          <PiTelegramLogoFill size={'22'} className="inline" /> Get In Touch
        </button>
      </div>
    </Card>
  );
};

export default UserCard;
