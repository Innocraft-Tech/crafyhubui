'use client';
import { Stack } from '@chakra-ui/layout';
import Conversation from 'components/chat/Conversation';
import UserCard from 'components/user/discover/UserCard';
import React, { useState } from 'react';
import { BsArrowBarUp } from 'react-icons/bs';
import { useGetAllUsersQuery } from 'store/api/usersApi';

const Discover = () => {
  const { data, isError, isLoading } = useGetAllUsersQuery();

  const [conversationModal, setConversationModal] = useState<User | null>(null);

  const openConversationModal = (user: User) => {
    setConversationModal(user);
  };

  const closeConversationModal = () => {
    setConversationModal(null);
  };

  return (
    <>
      <Conversation
        user={conversationModal}
        closeConversationModal={closeConversationModal}
      />
      <Stack direction="row" spacing={12} className="mt-2">
        <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-gray-100 p-2 text-navy-700 transition duration-200 hover:cursor-pointer hover:bg-gray-200 active:bg-gray-200 dark:!bg-navy-800 dark:text-white dark:hover:opacity-90 dark:active:opacity-80">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0V0z"></path>
            <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V10h16v11zm0-13H4V5h16v3z"></path>
          </svg>
          <span className="text-sm font-medium text-navy-700 dark:text-white">
            Filters
          </span>
        </button>
        <button className="linear mt-1 flex items-center justify-center gap-2 rounded-lg bg-gray-100 p-2 text-navy-700 transition duration-200 hover:cursor-pointer hover:bg-gray-200 active:bg-gray-200 dark:!bg-navy-800 dark:text-white dark:hover:opacity-90 dark:active:opacity-80">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0V0z"></path>
            <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V10h16v11zm0-13H4V5h16v3z"></path>
          </svg>
          <span className="text-sm font-medium text-navy-700 dark:text-white">
            Post New Job
          </span>
        </button>
      </Stack>
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        {data?.users.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            openConversationModal={openConversationModal}
          />
        ))}
      </div>
    </>
  );
};

export default Discover;
