import React from 'react';

const ChatBox = () => {
  return (
    <div className="flex cursor-pointer items-center rounded px-4 py-2 hover:bg-gray-2 dark:hover:bg-strokedark">
      <div className="relative mr-3.5 h-11 w-full max-w-11 rounded-full">
        <img
          src="https://github.com/shadcn.png"
          alt="profile"
          className="h-full w-full object-cover object-center"
        />
        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-gray-2 bg-success" />
      </div>
      <div className="w-full">
        <h5 className="text-sm font-medium text-black dark:text-white">
          Henry Dholi
        </h5>
        <p className="text-sm font-medium">I cam across your profile and...</p>
      </div>
    </div>
  );
};

export default ChatBox;
