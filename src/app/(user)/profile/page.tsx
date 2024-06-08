'use client';

import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useUserInfo from '@/lib/hooks/useUserInfo';
import { checkProfileComplete } from '@/lib/utils';
import { LoaderIcon, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import ProfileLeftSection from './components/profileLeftSection';

export default function Profile(): JSX.Element {
  const { userInfo, isLoading: isLoadingProfile, isError } = useUserInfo();

  const [profileCompleteBtn, setProfileCompleteBtn] = useState(
    userInfo?.profileIsComplete,
  );

  const hasRunOnce = useRef(false);

  useEffect(() => {
    if (!hasRunOnce.current && !userInfo?.profileIsComplete) {
      setProfileCompleteBtn(true);
      hasRunOnce.current = true;
    }
  }, [userInfo]);

  if (isLoadingProfile) {
    return (
      <div className="flex min-h-[75vh] items-center justify-center">
        <LoaderIcon className="my-28 h-16 w-16 animate-spin text-primary/60" />
      </div>
    );
  }

  if (isError || !userInfo) {
    return (
      <div className="flex min-h-[75vh] items-center justify-center">
        <Alert className="mx-auto max-w-md">
          <AlertTitle>Something went wrong</AlertTitle>
          {/* <AlertDescription>{'message'}</AlertDescription> */}
        </Alert>
      </div>
    );
  }

  const closeProfileComplete = () => {
    setProfileCompleteBtn(false);
  };

  console.log(checkProfileComplete(userInfo), 'checkProfileComplete');

  const profilePercentage = checkProfileComplete(userInfo);
  const UpdateAdditionalInfo = () => {
    // Perform the update logic here
    return (
      <div className="flex min-h-[75vh] items-center justify-center">
        <Alert className="mx-auto max-w-md"> hello</Alert>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="w-full p-6 md:w-1/3">
        <ProfileLeftSection />
      </div>

      {/* Right Section */}
      <div className="w-full p-6 md:w-2/3">
        <Card className="shadow-none">
          <CardContent>
            <div className="flex cursor-pointer items-center justify-start py-3">
              <Button className="mr-4 rounded-full border border-gray-300 bg-white p-2">
                {' '}
                <span className="text-2xl">+</span>
              </Button>
              <h1 className="text-3xl font-bold">
                Add a professional one-liner
              </h1>
            </div>

            <Tabs defaultValue="work" className="mt-4">
              <TabsList>
                <TabsTrigger value="work">Work</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="recommendations">
                  Recommendations
                </TabsTrigger>
              </TabsList>
              <TabsContent value="work">
                <div className="rounded-lg bg-yellow-100 p-4 text-yellow-800">
                  Need project ideas?{' '}
                  <a href="#" className="text-blue-500">
                    Generate AI suggestions
                  </a>
                </div>
                <div className="mt-4 flex items-center rounded-lg bg-gray-100 p-4">
                  <Link href="/jobs/newpost">
                    <Button className="mr-4 rounded-full border border-gray-300 bg-white p-2">
                      <span className="text-2xl">+</span>
                    </Button>
                  </Link>
                  <div>
                    <h2 className="font-bold text-gray-700"> Post Job </h2>

                    <p className="text-gray-500">
                      Your projects should highlight your best skills and
                      experience.
                    </p>
                    <a href="#" className="text-blue-500">
                      Import content in seconds
                    </a>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {profileCompleteBtn && (
        <div className="w-70 fixed bottom-10 right-10 flex items-center justify-between rounded-full bg-brand-500 p-3 text-white shadow-lg">
          <div className="flex items-center">
            <div className="relative mr-3 h-10 w-10">
              <svg className="absolute inset-0" viewBox="0 0 36 36">
                <path
                  className="text-white"
                  d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="text-brand-700"
                  d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeDasharray={'100'}
                  strokeDashoffset={profilePercentage}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xs">
                {Math.round(profilePercentage)}%
              </div>
            </div>
            <span>Complete profile</span>
          </div>
          <button
            className="ml-4 hover:text-gray-300 focus:outline-none"
            onClick={closeProfileComplete}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
