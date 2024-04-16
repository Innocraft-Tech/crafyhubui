import { Avatar } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useState } from 'react';

const AvatarFallback = ({ userData }) => {
  const [errorSrc, setErrorSrc] = useState(false);
  return (
    <>
      {!errorSrc && userData.profilePicture ? (
        <Image
          width="2"
          height="20"
          className="h-full w-full rounded-full"
          src={userData.profilePicture || ''}
          alt=""
          onError={() => {
            setErrorSrc(true);
          }}
        />
      ) : (
        <div className="relative inline-flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-lightPrimary dark:bg-navy-900">
          <span className="font-medium text-navy-700 dark:text-white">
            {`${userData.firstName?.charAt(0)}${userData.lastName?.charAt(0)}`}
          </span>
        </div>

        // <Avatar
        //   size="2xl"
        //   name={`${userData.firstName?.charAt(
        //     0,
        //   )}${' '}${userData.lastName?.charAt(0)}`}
        //   src=""
        // />
      )}
    </>
  );
};

export default AvatarFallback;
