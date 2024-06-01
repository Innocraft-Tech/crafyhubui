'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import useUserInfo from '@/lib/hooks/useUserInfo';
import { cn } from '@/lib/utils';
import { useGetJobsQuery } from '@/redux/api/jobApi';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { format } from 'date-fns/format';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';
import { LoaderIcon, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import React from 'react';

const formatOneTimeDetails = (details: (string | number)[]): string[] => {
  if (details.length < 4) {
    return [];
  }

  const [minRate, maxRate, , duration] = details;

  if (!minRate || !maxRate) {
    return [];
  }

  return [
    `$${Number(minRate).toLocaleString()} - $${Number(maxRate).toLocaleString()}`,
    'One-time',
    `Delivery time: ${duration}`,
  ];
};

const formatOngoingDetails = (details: (string | number)[]): string[] => {
  if (details.length < 4) {
    return [];
  }

  const [type, minRate, maxRate, hoursPerWeek] = details;

  if (typeof type !== 'string' || !type || !minRate || !maxRate) {
    return [];
  }

  return [
    `$${Number(minRate).toLocaleString()} - $${Number(maxRate).toLocaleString()}/hr`,
    `${Number(hoursPerWeek)} hrs/wk`,
    `Duration: ${type.charAt(0).toUpperCase() + type.slice(1)}`,
  ];
};

const JobsCard = () => {
  const { data: jobs, isLoading } = useGetJobsQuery();
  const router = useRouter();

  const { userInfo } = useUserInfo();

  const handleLinkClick = () => {
    router.push('/jobs/newpost');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[75vh] items-center justify-center">
        <LoaderIcon className="my-28 h-16 w-16 animate-spin text-primary/60" />
      </div>
    );
  }
  const applyJob = (e: React.FormEvent<HTMLFormElement>, job: Job) => {
    e.preventDefault();
    if (!userInfo?.profileIsComplete) {
      toast({
        title: 'Complete Profile',
        description: (
          <>
            <p>{'Please complete your profile to apply for a job'}</p>
            <Button className="px-0" variant="link" asChild>
              <Link href="/profile">Click here to go to the profile page</Link>
            </Button>
          </>
        ),
        variant: 'destructive',
      });
      return;
    }
    console.log('Applied to job', job);
  };

  return (
    <div className="container mx-auto p-5">
      <div className="mb-4 text-right">
        <Button
          variant="outline"
          className="rounded-xl px-2 font-light"
          onClick={handleLinkClick}
        >
          <Plus className="mr-2 h-5 w-5" />
          Post New Job
        </Button>
      </div>

      <div className="space-y-4">
        {jobs?.map((job) => (
          <Dialog key={job._id}>
            <DialogTrigger asChild>
              <button
                // key={job._id}
                className={cn(
                  'items-initial flex w-full flex-col gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
                )}
              >
                <div className="flex w-full items-center">
                  <div className="relative mr-4 h-16 w-16">
                    <Image
                      src={job.client?.profilePicture || ''}
                      alt="Company Logo"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm text-muted-foreground">
                      {job.client?.companyName ??
                        `${job.client?.firstName || ''} ${job.client?.lastName || ''}`}
                    </p>
                    <h3 className="scroll-m-20 text-2xl font-medium tracking-tight">
                      {job.jobTitle}
                    </h3>
                  </div>
                  <div className="flex flex-col justify-between self-start">
                    {job.createdAt ? (
                      <p className="font-small text-sm leading-7 text-gray-600">
                        {formatDistanceToNow(new Date(job.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {job.requiredSkills.map((skill) => (
                      <Badge
                        key={skill}
                        className="p-1 px-2 text-sm font-normal text-badge"
                        variant={'secondary'}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4">
                    {job.paymentOneTime &&
                      job.oneTime &&
                      job.oneTime.length >= 2 && (
                        <div className="mb-4 flex flex-wrap items-center space-x-2 text-sm">
                          {formatOneTimeDetails(job.oneTime).map(
                            (detail, index) =>
                              detail && (
                                <React.Fragment key={index}>
                                  {index > 0 && (
                                    <span className="text-gray-500">•</span>
                                  )}
                                  <p className="text-gray-700">{detail}</p>
                                </React.Fragment>
                              ),
                          )}
                        </div>
                      )}

                    {job.paymentOngoing &&
                      job.onGoing &&
                      job.onGoing.length >= 2 && (
                        <div className="flex flex-wrap items-center space-x-2 text-sm">
                          {formatOngoingDetails(job.onGoing).map(
                            (detail, index) => (
                              <React.Fragment key={index}>
                                {index > 0 && (
                                  <span className="text-gray-500">•</span>
                                )}
                                <p className="text-gray-700">{detail}</p>
                              </React.Fragment>
                            ),
                          )}
                        </div>
                      )}
                  </div>
                  {/* <p className="leading-7 text-gray-600 text-md">
                {job.jobDescription}
              </p> */}
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:mix-w-[425px]">
              <div className="flex flex-1 flex-col">
                <div className="flex items-start px-4 pl-0">
                  <div className="flex items-start gap-4 text-sm">
                    <Avatar>
                      <AvatarImage
                        alt={job?.client?.firstName}
                        src={job?.client?.profilePicture}
                      />
                      <AvatarFallback>
                        {job?.client?.firstName
                          .split(' ')
                          .map((chunk) => chunk[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="text-lg font-semibold">
                        {job.jobTitle}
                      </div>
                      <div className="line-clamp-1 text-xs">
                        {' '}
                        {job.client?.companyName ??
                          `${job.client?.firstName || ''} ${job.client?.lastName || ''}`}
                      </div>
                    </div>
                  </div>
                  {job.createdAt && (
                    <div className="ml-auto py-2">
                      {/* <p className="text-xs">Job posted at</p> */}
                      <div className="text-xs text-muted-foreground">
                        {format(new Date(job.createdAt), 'PPpp')}
                      </div>
                    </div>
                  )}
                </div>
                {/* <Separator /> */}
                <div className="px-4 pl-0">
                  <div className="mt-2 flex-1 whitespace-pre-wrap text-sm">
                    {job.jobDescription}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.requiredSkills.map((skill) => (
                      <Badge
                        key={skill}
                        className="p-1 px-2 text-sm font-normal text-badge"
                        variant={'secondary'}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4">
                    {job.paymentOneTime &&
                      job.oneTime &&
                      job.oneTime.length >= 2 && (
                        <div className="mb-4 flex flex-wrap items-center space-x-2 text-sm">
                          {formatOneTimeDetails(job.oneTime).map(
                            (detail, index) =>
                              detail && (
                                <React.Fragment key={index}>
                                  {index > 0 && (
                                    <span className="text-gray-500">•</span>
                                  )}
                                  <p className="text-gray-700">{detail}</p>
                                </React.Fragment>
                              ),
                          )}
                        </div>
                      )}

                    {job.paymentOngoing &&
                      job.onGoing &&
                      job.onGoing.length >= 2 && (
                        <div className="flex flex-wrap items-center space-x-2 text-sm">
                          {formatOngoingDetails(job.onGoing).map(
                            (detail, index) => (
                              <React.Fragment key={index}>
                                {index > 0 && (
                                  <span className="text-gray-500">•</span>
                                )}
                                <p className="text-gray-700">{detail}</p>
                              </React.Fragment>
                            ),
                          )}
                        </div>
                      )}
                  </div>
                </div>
                {/* <Separator className="mt-auto" /> */}
                <div className="px-4 pl-0 pt-0">
                  <form noValidate onSubmit={(e) => applyJob(e, job)}>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-end gap-4">
                        <DialogPrimitive.Close>
                          <Button
                            // onClick={(e) => e.preventDefault()}
                            size="sm"
                            className=""
                            variant={'outline'}
                            type="button"
                          >
                            Close
                          </Button>
                        </DialogPrimitive.Close>
                        <Button size="sm" className="" type="submit">
                          Apply Job
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              {/* <DialogHeader>
                <DialogTitle>{job.jobTitle}</DialogTitle>
                <DialogDescription>{job.jobDescription}</DialogDescription>
              </DialogHeader>
              <div>
                <div className="flex flex-wrap gap-2">
                  {job.requiredSkills.map((skill) => (
                    <Badge
                      key={skill}
                      className="p-1 px-2 text-sm font-normal text-badge"
                      variant={'secondary'}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4">
                  {job.paymentOneTime &&
                    job.oneTime &&
                    job.oneTime.length >= 2 && (
                      <div className="mb-4 flex flex-wrap items-center space-x-2 text-sm">
                        {formatOneTimeDetails(job.oneTime).map(
                          (detail, index) =>
                            detail && (
                              <React.Fragment key={index}>
                                {index > 0 && (
                                  <span className="text-gray-500">•</span>
                                )}
                                <p className="text-gray-700">{detail}</p>
                              </React.Fragment>
                            ),
                        )}
                      </div>
                    )}

                  {job.paymentOngoing &&
                    job.onGoing &&
                    job.onGoing.length >= 2 && (
                      <div className="flex flex-wrap items-center space-x-2 text-sm">
                        {formatOngoingDetails(job.onGoing).map(
                          (detail, index) => (
                            <React.Fragment key={index}>
                              {index > 0 && (
                                <span className="text-gray-500">•</span>
                              )}
                              <p className="text-gray-700">{detail}</p>
                            </React.Fragment>
                          ),
                        )}
                      </div>
                    )}
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Apply</Button>
              </DialogFooter> */}
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default JobsCard;
