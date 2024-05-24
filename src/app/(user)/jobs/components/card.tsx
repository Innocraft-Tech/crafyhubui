'use client';
import React from 'react';

import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useGetJobsQuery } from '@/redux/api/jobApi';
import { LoaderIcon } from 'lucide-react';

export function JobsCard() {
  const { data, isLoading } = useGetJobsQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[75vh]">
        <LoaderIcon className="my-28 h-16 w-16 text-primary/60 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="lg:grid px-5 py-1 discoverUsers">
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-3">
          <Card className="rounded-2xl p-5 my-2">
            <div className="flex items-center">
              <Avatar className="w-16 h-16 rounded-lg">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="mx-3">
                <h4 className="font-normal text-xl">Retool Dashboard</h4>
                <span className="font-light text-sm"> Google</span>
              </div>
            </div>
            <div className="flex my-5 gap-1 items-center">
              <span className="text-xs">$25 - $75/hour</span>
              <Separator orientation="vertical" className="mx-1 h-5" />
              <span className="text-xs">40hrs/week</span>
              <Separator orientation="vertical" className="mx-1 h-5" />
              <span className="text-xs">One-Time</span>
            </div>
          </Card>

          {/* Repeat the above Card and description block for additional cards */}
          <Card className="rounded-2xl p-5 my-2">
            <div className="flex items-center">
              <Avatar className="w-16 h-16 rounded-lg">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="mx-3">
                <h4 className="font-normal text-xl">Retool Dashboard</h4>
                <span className="font-light text-sm"> Google</span>
              </div>
            </div>
            <div className="flex my-5 gap-1 items-center">
              <span className="text-xs">$25 - $75/hour</span>
              <Separator orientation="vertical" className="mx-1 h-5" />
              <span className="text-xs">40hrs/week</span>
              <Separator orientation="vertical" className="mx-1 h-5" />
              <span className="text-xs">One-Time</span>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
