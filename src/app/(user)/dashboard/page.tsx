'use client';

import Card from '@/components/card';
import { Button } from '@/components/ui/button';
import { CardHeader, CardContent } from '@/components/ui/card';
import useUserInfo from '@/lib/hooks/useUserInfo';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const { userInfo } = useUserInfo();
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Welcome, {userInfo?.firstName}{' '}
        <span role="img" aria-label="wave">
          👋
        </span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-xl font-semibold">Build profile</h2>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">Get access to more features.</p>
            <Button
              variant="outline"
              onClick={() => handleNavigation('/profile')}
            >
              Complete profile
            </Button>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-xl font-semibold">Unlock your next job</h2>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">
              Join Contra&apos;s Job Network and explore exclusive
              opportunities.
            </p>
            <Button variant="outline" onClick={() => handleNavigation('/jobs')}>
              Explore jobs
            </Button>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader>
            <h2 className="text-xl font-semibold">Send invoice or proposal</h2>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">
              Manage your workflow commission-free
            </p>
            <Button variant="outline">Invite client</Button>
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
        <h2 className="text-2xl font-bold">
          Unleash the power of data insights
        </h2>
      </div>
    </div>
  );
}
