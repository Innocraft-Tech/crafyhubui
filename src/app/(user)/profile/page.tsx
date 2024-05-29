'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileLeftSection from './components/profileLeftSection';
import useUserInfo from '@/lib/hooks/useUserInfo';
import { LoaderIcon } from 'lucide-react';

export default function Profile(): JSX.Element {
  const { isLoading: isLoadingProfile } = useUserInfo();

  if (isLoadingProfile) {
    return (
      <div className="flex items-center justify-center min-h-[75vh]">
        <LoaderIcon className="my-28 h-16 w-16 text-primary/60 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="w-full md:w-1/3 p-6">
        <ProfileLeftSection />
      </div>

      {/* Right Section */}
      <div className="w-full md:w-2/3 p-6">
        <Card className="shadow-lg">
          <CardContent>
            <h1 className="text-3xl font-bold">Add a professional one-liner</h1>
            <Tabs defaultValue="work" className="mt-4">
              <TabsList>
                <TabsTrigger value="work">Work</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="recommendations">
                  Recommendations
                </TabsTrigger>
              </TabsList>
              <TabsContent value="work">
                <div className="p-4 bg-yellow-100 rounded-lg text-yellow-800">
                  Need project ideas?{' '}
                  <a href="#" className="text-blue-500">
                    Generate AI suggestions
                  </a>
                </div>
                <div className="mt-4 p-4 bg-gray-100 rounded-lg flex items-center">
                  <Button className="bg-white border border-gray-300 rounded-full p-2 mr-4">
                    <span className="text-2xl">+</span>
                  </Button>
                  <div>
                    <h2 className="text-gray-700 font-bold">Add a project</h2>
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
    </div>
  );
}
