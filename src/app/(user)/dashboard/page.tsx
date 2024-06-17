'use client';

import Card from '@/components/card';
import { Button } from '@/components/ui/button';
import { CardContent, CardHeader } from '@/components/ui/card';
import useUserInfo from '@/lib/hooks/useUserInfo';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
export default function Dashboard() {
  const { userInfo, isLoading: isLoadingProfile, isError } = useUserInfo();

  const router = useRouter();
  const [profileCompleteBtn, setProfileCompleteBtn] = useState(
    userInfo?.profileIsComplete,
  );

  const handleNavigation = (path: string) => {
    router.push(path);
  };
  const closeProfileComplete = () => {
    setProfileCompleteBtn(false);
  };

  return (
    <div className="p-6">
      <h1 className="my-3 px-2 text-3xl font-bold">
        Welcome, {userInfo?.firstName}{' '}
        <span role="img" aria-label="wave">
          👋
        </span>
      </h1>
      <div className="my-6 grid grid-cols-1 gap-6 sm:max-w-[1300px] md:grid-cols-3">
        <Card className="rounded-[20px] border border-[#FF0055] bg-[#F7F6F6] shadow-lg">
          <CardHeader>
            <h2 className="text-xl font-semibold">Build profile</h2>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-500">Get access to more features.</p>
            <div className="">
              <Button
                variant="outline"
                onClick={() => handleNavigation('/profile')}
                className="rounded-2xl border-black"
              >
                Complete profile
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-[20px] border border-[#FF0055] bg-[#F7F6F6] shadow-lg">
          <CardHeader>
            <h2 className="text-xl font-semibold">Find your next job</h2>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-500">Explore exclusive jobs.</p>
            <div className="">
              <Button
                variant="outline"
                onClick={() => handleNavigation('/jobs')}
                className="rounded-2xl border-black"
              >
                Explore jobs
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-[20px] border border-[#FF0055] bg-[#F7F6F6] shadow-lg">
          <CardHeader>
            <h2 className="text-xl font-semibold">Connect with Users</h2>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-gray-500">
              Explore and connect with other users on our platform
            </p>
            <div>
              <Link href="/discover">
                <Button variant="outline" className="rounded-2xl border-black">
                  Connect Now
                </Button>{' '}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="text-center">
        <Image
          src="/data-insights.png"
          alt="Data Insights"
          width={200}
          height={200}
          className="mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold">Craft your future with CrafyHub!</h2>
        <p className="my-3">
          CraftyHub is more than just a freelance marketplace; It&apos;s a
          vibrant community where creativity thrives, and talented individuals
          forge meaningful connections
        </p>
      </div>
    </div>
  );
}
