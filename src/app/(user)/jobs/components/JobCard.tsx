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
import { toast } from '@/components/ui/use-toast';
import useUserInfo from '@/lib/hooks/useUserInfo';
import {
  useApplyJobMutation,
  useGetJobsQuery,
  useGetUserPostJobQuery,
} from '@/redux/api/jobApi';
import { skipToken } from '@reduxjs/toolkit/query';
import { format, formatDistanceToNow } from 'date-fns';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
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
  const [applyJob, { isError, isSuccess, isLoading: loadApplyJob }] =
    useApplyJobMutation();

  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const { data: jobs, isLoading } = useGetJobsQuery();
  const { data: userPostJob, isLoading: postJobLoading } =
    useGetUserPostJobQuery(userInfo?._id ? userInfo._id : skipToken);

  const router = useRouter();
  useEffect(() => {
    // Retrieve the applied jobs from localStorage on component mount
    const storedAppliedJobs = localStorage.getItem('appliedJobs');
    if (storedAppliedJobs) {
      setAppliedJobs(JSON.parse(storedAppliedJobs));
    }
  }, []);

  const handleLinkClick = () => {
    router.push('/jobs/newpost');
  };
  const handleApplyJob = async (e: React.FormEvent, jobid: any) => {
    e.preventDefault();

    const userId = userInfo?._id ?? '';
    const jobId = jobid;
    console.log(jobId);

    try {
      await applyJob({ jobId, userId }).unwrap();
      toast({
        title: 'Job Applied successfully',
      });
      const updatedAppliedJobs = [...appliedJobs, jobId];
      setAppliedJobs(updatedAppliedJobs); // Update the state

      // Save the updated applied jobs to localStorage
      localStorage.setItem('appliedJobs', JSON.stringify(updatedAppliedJobs));
    } catch (error) {
      console.error('Failed to apply for job:', error);
    }
  };
  const ApplyedAllUsers = jobs?.map((job) => job.appliedUsers);
  console.log(ApplyedAllUsers);

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

                      <div className="ml-auto">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="outline"
                              className={`${
                                job._id && appliedJobs.includes(job._id)
                                  ? 'bg-green-500 text-white'
                                  : 'hover:bg-[#ff0055] hover:text-white'
                              }`}
                              disabled={
                                job._id ? appliedJobs.includes(job._id) : false
                              }
                            >
                              {job._id && appliedJobs.includes(job._id)
                                ? 'Applied'
                                : 'Apply'}
                            </Button>
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
                                  onSubmit={(e) => handleApplyJob(e, job._id)}
                                >
                                  <div className="grid gap-4">
                                    <div className="flex items-center justify-end gap-4">
                                      <AlertDialogCancel>
                                        Close
                                      </AlertDialogCancel>
                                      <AlertDialogAction type="submit">
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
                  </CardTitle>
                  <CardTitle className="mx-6 ml-auto">
                    <span className="text-start text-sm">
                      {formatDistanceToNow(
                        new Date(job.createdAt ?? Date.now()),
                        {
                          addSuffix: true,
                        },
                      )}
                    </span>
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
