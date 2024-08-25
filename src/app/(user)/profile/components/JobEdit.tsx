'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import useUserInfo from '@/lib/hooks/useUserInfo';
import {
  useGetUserPostJobQuery,
  useUpdatePostJobMutation,
} from '@/redux/api/jobApi';
import { TabsContent } from '@radix-ui/react-tabs';
import { skipToken } from '@reduxjs/toolkit/query';
import { useState } from 'react';
import { RiFileEditLine } from 'react-icons/ri';
const JobEdit = () => {
  const { userInfo } = useUserInfo();
  const { data: userPostJob } = useGetUserPostJobQuery(
    userInfo?._id ? userInfo._id : skipToken,
  );
  const { token } = useUserInfo();

  const [updatePostJob, { isLoading: isLoadingUpdatePostJob }] =
    useUpdatePostJobMutation();

  const [editFormData, setEditFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    requiredSkills: '',
  });

  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  // Add a state to manage job posts
  const [jobList, setJobList] = useState(userPostJob || []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent, postId: string) => {
    e.preventDefault();

    try {
      await updatePostJob({
        jobid: postId,
        token: token,
        data: {
          jobTitle: editFormData.jobTitle,
          jobDescription: editFormData.jobDescription,
          requiredSkills: editFormData.requiredSkills.split(','), // Assuming skills are comma-separated
        },
      }).unwrap();

      // Update the UI with the new job details
      const updatedJobs =
        jobList &&
        jobList.map((job: { _id: string }) =>
          job._id === postId
            ? {
                ...job,
                jobTitle: editFormData.jobTitle,
                jobDescription: editFormData.jobDescription,
                requiredSkills: editFormData.requiredSkills.split(','),
                // updatedAt: new Date().toISOString(),
              }
            : job,
        );

      // Set the updated job list to state
      setJobList(updatedJobs);

      toast({
        title: 'Job updated successfully',
        description: 'Your job post has been updated.',
        className: 'bg-green-500 text-white',
      });

      setSelectedJobId(null);
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  return (
    <TabsContent
      value="jobs"
      className="m-2 grid grid-cols-1 gap-4 sm:grid-cols-3"
    >
      {jobList &&
        jobList.map((postDetails: any) => (
          <Card
            className="my-4 flex w-full max-w-md flex-col justify-between p-4 sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl"
            key={postDetails._id}
          >
            <CardHeader>
              <CardTitle className="p-2 text-center sm:text-left">
                <span className="text-lg">{postDetails.jobTitle}</span>
              </CardTitle>
              <CardTitle className="my-3 p-2 text-center sm:text-left">
                <span className="text-xs">{postDetails.jobDescription}</span>
              </CardTitle>
              <CardTitle className="my-3 w-full p-2 text-center sm:text-left">
                {postDetails.requiredSkills.map(
                  (skill: any, index: number | null | undefined) => (
                    <Badge
                      className="mx-1 mb-1 inline-block px-3 py-1 text-sm"
                      key={index}
                    >
                      {skill}
                    </Badge>
                  ),
                )}
              </CardTitle>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Dialog
                open={selectedJobId === postDetails._id}
                onOpenChange={(isOpen) => {
                  if (!isOpen) setSelectedJobId(null);
                }}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="mt-4 flex w-full items-center justify-center"
                    onClick={() => {
                      setEditFormData({
                        jobTitle: postDetails.jobTitle,
                        jobDescription: postDetails.jobDescription,
                        requiredSkills: postDetails.requiredSkills.join(','),
                      });
                      setSelectedJobId(postDetails._id);
                    }}
                  >
                    <RiFileEditLine className="mr-2" />
                    <span>Edit Jobs</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="my-3 text-center">
                      Edit Jobs
                    </DialogTitle>
                  </DialogHeader>
                  <form
                    onSubmit={(e) => handleFormSubmit(e, postDetails._id || '')}
                  >
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      type="text"
                      id="jobTitle"
                      name="jobTitle"
                      value={editFormData.jobTitle}
                      onChange={handleInputChange}
                      className="my-3 w-full"
                    />
                    <Label htmlFor="jobDescription">Job Description</Label>
                    <Input
                      type="text"
                      id="jobDescription"
                      name="jobDescription"
                      value={editFormData.jobDescription}
                      onChange={handleInputChange}
                      className="my-3 w-full"
                    />
                    <Label htmlFor="requiredSkills">Required Skills</Label>
                    <Input
                      id="requiredSkills"
                      name="requiredSkills"
                      value={editFormData.requiredSkills}
                      onChange={handleInputChange}
                      className="my-3 w-full"
                    />
                    <Button
                      type="submit"
                      disabled={isLoadingUpdatePostJob}
                      className="mt-3"
                    >
                      {isLoadingUpdatePostJob ? 'Saving...' : 'Save changes'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
    </TabsContent>
  );
};

export default JobEdit;
