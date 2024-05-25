'use client';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useGetJobsQuery } from '@/redux/api/jobApi';
import { formatDistanceToNow } from 'date-fns';
import { LoaderIcon } from 'lucide-react';
import Image from 'next/image';
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
    `${duration}Delivery time: ${duration}`,
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[75vh]">
        <LoaderIcon className="my-28 h-16 w-16 text-primary/60 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5">
      <div className="space-y-4">
        {jobs?.map((job) => (
          <Card key={job._id} className="p-6">
            <div className="flex items-center">
              <div className="h-16 w-16 relative mr-4">
                <Image
                  // src={job?.companyLog || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZTUc2UzF5S_JvZ8RXycFaNi0d8ERsDGMdUO7tblnoHg&s'
                  // '}
                  src={
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZTUc2UzF5S_JvZ8RXycFaNi0d8ERsDGMdUO7tblnoHg&s'
                  }
                  alt="Company Logo"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <div className="flex-grow">
                <h3 className="scroll-m-20 text-2xl font-medium tracking-tight">
                  {job.jobTitle}
                </h3>
              </div>
              <div className="flex flex-col justify-between">
                <p className="leading-7 text-gray-600 font-small text-sm">
                  {job?.createdAt
                    ? `${formatDistanceToNow(new Date(job.createdAt))} ago`
                    : ''}
                </p>
              </div>
            </div>
            <div>
              <div className="flex flex-wrap gap-2 mt-2">
                {job.requiredSkills.map((skill) => (
                  <Badge
                    key={skill}
                    className="text-badge text-sm font-normal p-1 px-2"
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
                    <div className="mb-4 flex text-sm flex-wrap items-center space-x-2">
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
                    <div className="flex text-sm flex-wrap items-center space-x-2">
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
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobsCard;
