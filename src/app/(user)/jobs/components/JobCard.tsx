'use client';
import Card from '@/components/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import useUserInfo from '@/lib/hooks/useUserInfo';
import { useGetJobsQuery } from '@/redux/api/jobApi';
import { format } from 'date-fns';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
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
  const { userInfo } = useUserInfo();

  const [appliedJob, setAppliedJob] = useState<string[]>(
    userInfo?.appliedJobs || [],
  );
  const { data: jobs, isLoading } = useGetJobsQuery();
  const router = useRouter();

  const handleLinkClick = () => {
    router.push('/jobs/newpost');
  };

  const applyJob = (e: React.FormEvent<HTMLFormElement>, job: Job) => {
    e.preventDefault();

    // if (!userInfo?.profileIsComplete) {
    //   toast({
    //     title: 'Complete Profile',
    //     description: (
    //       <>
    //         <p>{'Please complete your profile to apply for a job'}</p>
    //         <Button className="px-0" variant="link" asChild>
    //           <Link href="/profile">Click here to go to the profile page</Link>
    //         </Button>
    //       </>
    //     ),
    //     variant: 'destructive',
    //   });

    //   return;
    // }
    //   if (appliedJob.includes(job)) {
    //     toast({
    //       title: 'Already Applied',
    //       description: 'You have already applied for this job.',
    //       variant: 'destructive',
    //     });
    //   } else {
    //     // Add job to applied jobs
    //     setAppliedJob([...appliedJob, job]);

    //     toast({
    //       title: 'Applied to job successfully',
    //     });
    //   }

    //   console.log('Applied to job', appliedJob);
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
        {jobs?.map((job, id) => (
          <>
            <div className="border">
              <Card key={id}>
                <CardHeader>
                  <CardTitle>
                    {' '}
                    <div className="">
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
                        {/* {appliedJob.includes(job._id) ? (
      <Badge className="text-xs font-semibold">Applied</Badge>
    ) : (
      ''
    )} */}{' '}
                        <div className="ml-auto">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline">Apply Job</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  <div>
                                    {' '}
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
                                              {format(
                                                new Date(job.createdAt),
                                                'PPpp',
                                              )}
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
                                                {formatOneTimeDetails(
                                                  job.oneTime,
                                                ).map(
                                                  (detail, index) =>
                                                    detail && (
                                                      <React.Fragment
                                                        key={index}
                                                      >
                                                        {index > 0 && (
                                                          <span className="text-gray-500">
                                                            •
                                                          </span>
                                                        )}
                                                        <p className="text-gray-700">
                                                          {detail}
                                                        </p>
                                                      </React.Fragment>
                                                    ),
                                                )}
                                              </div>
                                            )}

                                          {job.paymentOngoing &&
                                            job.onGoing &&
                                            job.onGoing.length >= 2 && (
                                              <div className="flex flex-wrap items-center space-x-2 text-sm">
                                                {formatOngoingDetails(
                                                  job.onGoing,
                                                ).map((detail, index) => (
                                                  <React.Fragment key={index}>
                                                    {index > 0 && (
                                                      <span className="text-gray-500">
                                                        •
                                                      </span>
                                                    )}
                                                    <p className="text-gray-700">
                                                      {detail}
                                                    </p>
                                                  </React.Fragment>
                                                ))}
                                              </div>
                                            )}
                                        </div>
                                      </div>

                                      {/* <Separator className="mt-auto" /> */}
                                    </div>
                                  </div>
                                </AlertDialogTitle>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <div className="px-4 pl-0 pt-0">
                                  <form
                                    noValidate
                                    onSubmit={(e) => applyJob(e, job)}
                                  >
                                    <div className="grid gap-4">
                                      <div className="flex items-center justify-end gap-4">
                                        <AlertDialogCancel>
                                          Close
                                        </AlertDialogCancel>
                                        <AlertDialogAction>
                                          submit
                                        </AlertDialogAction>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  </CardTitle>
                  <CardDescription>
                    {' '}
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
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default JobsCard;
