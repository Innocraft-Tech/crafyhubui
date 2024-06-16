'use client';

import InputField from '@/components/forms/input-field';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useUserInfo from '@/lib/hooks/useUserInfo';
import { checkProfileComplete } from '@/lib/utils';
import { useGetUserPostJobQuery } from '@/redux/api/jobApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { skipToken } from '@reduxjs/toolkit/query';
import { LoaderIcon, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ProgressBar from '../components/progressbar/ProgressBar';
import ProfileLeftSection from './components/profileLeftSection';
import { UserInfo, userInfoSchema } from './components/profileSchema';
const getDataPayload = (userInfo: User | undefined) => {
  return {
    addOneLiner: userInfo?.addOneLiner || '',
  };
};
export default function Profile(): JSX.Element {
  const { userInfo, isLoading: isLoadingProfile, isError } = useUserInfo();
  const [isEditingName, setIsEditingName] = useState(false);
  const { data, isLoading } = useGetUserPostJobQuery(
    userInfo?._id ? userInfo._id : skipToken,
  );

  const addOneLinerForm = useForm<UserInfo>({
    resolver: zodResolver(userInfoSchema),
    mode: 'onChange',
    defaultValues: {
      addOneLiner: userInfo?.addOneLiner || '',
    },
  });
  const [profileCompleteBtn, setProfileCompleteBtn] = useState(
    userInfo?.profileIsComplete,
  );

  const hasRunOnce = useRef(false);
  const {
    reset: resetAddOneLinerForm,
    handleSubmit: handleOneLinerSubmit,
    control: addOneLinerControl,
    formState: { errors: addOneLinerErrors },
  } = addOneLinerForm;

  useEffect(() => {
    if (!hasRunOnce.current && !userInfo?.profileIsComplete) {
      setProfileCompleteBtn(true);
      hasRunOnce.current = true;
    }
  }, [userInfo]);

  useEffect(() => {
    if (userInfo) {
      resetAddOneLinerForm({
        addOneLiner: userInfo.addOneLiner,
      });
    }
  }, [userInfo, resetAddOneLinerForm]);
  if (isLoadingProfile) {
    return (
      <div className="flex min-h-[75vh] items-center justify-center">
        <ProgressBar />
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

  const handleEditNameClick = () => {
    setIsEditingName(true);
  };
  const handleCancelNameClick = () => {
    setIsEditingName(false);
    resetAddOneLinerForm();
  };

  const closeProfileComplete = () => {
    setProfileCompleteBtn(false);
  };
  const handleSaveNameClick: SubmitHandler<UserInfo> = (data: any) => {
    setIsEditingName(false);
    const payload = {
      ...getDataPayload(userInfo),
      ...data,
    };
  };
  console.log(checkProfileComplete(userInfo), 'checkProfileComplete');

  if (!userInfo._id) {
    return <div className="mx-2">no data available</div>;
  }

  if (isLoading) {
    return <ProgressBar />;
  }

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
        <Card className="w-full shadow-none">
          <CardContent>
            <div className="flex w-full cursor-pointer items-center justify-start py-3">
              {/* <Button className="mr-4 rounded-full border border-gray-300 bg-white p-2">
                {' '}
                <span className="text-2xl">+</span>
              </Button>
               */}
              {isEditingName ? (
                <Form {...addOneLinerForm}>
                  <form
                    onSubmit={handleOneLinerSubmit(handleSaveNameClick)}
                    className="w-full space-y-4"
                  >
                    <div className="grid w-full grid-cols-1 items-start justify-center gap-1">
                      <div className="w-full">
                        <InputField
                          name="addOneLiner"
                          placeholder=" Add One Liner"
                          type="text"
                          control={addOneLinerControl}
                        />{' '}
                        {addOneLinerErrors.addOneLiner && (
                          <p className="text-red-500">
                            {addOneLinerErrors.addOneLiner.message}
                          </p>
                        )}
                      </div>
                      <br />
                      <div className="flex w-full items-end justify-end space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleCancelNameClick}
                          className="w-full"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          variant="default"
                          className="w-full"
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </form>
                </Form>
              ) : (
                <div
                  className="relative flex cursor-pointer flex-col p-2 hover:bg-accent/30 hover:text-accent-foreground"
                  onClick={handleEditNameClick}
                >
                  {' '}
                  <div className="group sm:w-64">
                    {userInfo?.addOneLiner}
                    <h1 className="mx-2 inline w-full font-bold sm:text-3xl">
                      {' '}
                      Add One Liner{userInfo?.addOneLiner}
                    </h1>

                    <button className="top-1/2-translate-y-1/2 absolute right-0 my-3 transform opacity-0 transition-opacity group-hover:opacity-100">
                      <svg
                        className="h-5 w-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.232 5.232l3.536 3.536M4 13.5v6h6l11.243-11.243a1.5 1.5 0 00-2.121-2.121L4 13.5z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              )}
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
