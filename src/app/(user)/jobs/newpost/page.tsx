'use client';

import HandleResponse from '@/components/common/HandleResponse';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MultipleSelector from '@/components/ui/multiple-selector';
import { isMyKnownError, SOMETHING_WENT_WRONG } from '@/lib/api';
import { useAddSkillMutation, useGetSkillsQuery } from '@/redux/api/authApi';
import { usePostJobMutation } from '@/redux/api/jobApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toolsSchema, TypeToolsSchema } from '../components/toolsData';

const JobNewPost = () => {
  const { data: skillsOptions = [] } = useGetSkillsQuery();
  const [addSkillMutation] = useAddSkillMutation();

  const [
    postJob,
    { data: successData = {}, isLoading, isSuccess, isError, error },
  ] = usePostJobMutation();

  const form = useForm<TypeToolsSchema>({
    resolver: zodResolver(toolsSchema),
    mode: 'onChange',
    defaultValues: {
      jobTitle: '',
      languages: [],
      requiredSkills: [],
      // minRate: '',
      // maxRate: '',
      jobDescription: '',
      // timeZone: '',
    },
  });

  const onSubmit = async (data: TypeToolsSchema) => {
    // handle form submission
    console.log('Form submitted', data);
    postJob(data);
  };

  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  const decrement = () => count > 0 && setCount(count - 1);

  const [display, setDisplay] = useState(false);
  const handleSave = () => setDisplay(!display);

  const onSuccess = () => {
    redirect('/jobs');
  };

  return (
    <>
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={
            isMyKnownError(error) ? error.data.message : SOMETHING_WENT_WRONG
          }
          message={successData?.message || ''}
          onSuccess={onSuccess}
        />
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="container mx-auto p-5"
        >
          <div className="w-full sm:w-[60%] p-6 border rounded-md mx-auto">
            <div className="mb-6">
              <Label className="font-bold text-sm">Job Title</Label>
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Add a Descriptive Title"
                        className="text-2xl my-4 border px-4 py-2 rounded-md w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-6">
              <Label className="font-bold text-sm">Skills</Label>
              <FormField
                control={form.control}
                name="requiredSkills"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <MultipleSelector
                        options={skillsOptions}
                        creatable
                        placeholder="Add up to three skills"
                        loadingIndicator={
                          <p className="py-2 text-center text-lg leading-10 text-muted-foreground">
                            loading...
                          </p>
                        }
                        emptyIndicator={
                          <p className="w-full text-center text-lg leading-10 text-muted-foreground">
                            no results found.
                          </p>
                        }
                        onSelectCreate={(value: string) => {
                          const data = { skill: value };
                          addSkillMutation(data);
                        }}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Product Designer, UX Designer, UI Designer
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* <div className="mb-6">
            <div className="flex gap-4 items-center">
              <Label className="font-bold text-sm">Budget & Duration</Label>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <div className="inline-block  bg-gray-100 px-3 py-3 rounded-[50px] my-1 cursor-pointer">
                    <FaPen color="  gray" />
                  </div>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Set Budget and Duration</AlertDialogTitle>
                    <AlertDialogDescription>
                      <p className=" font-bold text-xs  text-gray-800">
                        {' '}
                        What type of project do you need?
                      </p>

                      <Tabs defaultValue="one-time" className="  w-60 p-2 my-2">
                        <TabsList className=" py-6 mx-3 w-[400px]">
                          <TabsTrigger
                            value="one-time"
                            className=" py-2 mx-3 w-[400px]"
                          >
                            <TfiMoney className=" mx-2" /> One Time
                          </TabsTrigger>
                          <TabsTrigger
                            value="ongoing"
                            className=" py-2 mx-3 w-[400px]"
                          >
                            <FaRegClock className=" mx-2" />{' '}
                            <span>Ongoing</span>
                          </TabsTrigger>
                        </TabsList>
                        <TabsContent value="one-time">
                          <div className="category grid grid-cols-2  place-content-center w-[400px] my-1 ">
                            <div className=" w-[200px]">
                              <FormField
                                control={form.control}
                                name="minRate"
                                render={({ field }) => (
                                  <FormControl>
                                    <FormItem>
                                      <Label
                                        htmlFor="Min.rate"
                                        className=" mx-3"
                                      >
                                        Min. rate
                                      </Label>
                                      <Input
                                        type="number"
                                        id="number"
                                        placeholder="$ 2,500"
                                        className=" my-1 mx-3"
                                        {...field}
                                      />
                                    </FormItem>
                                  </FormControl>
                                )}
                              />
                            </div>
                            <div className=" mx-3 w-[200px]">
                              <FormField
                                control={form.control}
                                name="maxRate"
                                render={({ field }) => (
                                  <FormControl>
                                    <FormItem>
                                      <Label
                                        htmlFor="Min.rate"
                                        className=" mx-3"
                                      >
                                        Max. rate
                                      </Label>
                                      <Input
                                        type="number"
                                        id="text"
                                        placeholder="$ 5,000"
                                        className=" my-1 mx-3"
                                        {...field}
                                      />
                                    </FormItem>
                                  </FormControl>
                                )}
                              />
                            </div>
                          </div>
                          <p className=" mx-3 text-xs my-3 ">
                            We review every job to ensure a high quality
                            marketplace
                          </p>
                          <span className=" block mx-3 text-xs my-3 ">
                            {' '}
                            When do you need this project delivered by?
                          </span>
                          <div className=" grid grid-cols-2 mx-2 w-[400px]  gap-5">
                            <div className="'mx-5 grid grid-cols-5 border  gap-1 w-[200px] ">
                              <input
                                type="text"
                                className=" mx-3 py-2 px-2 m-auto  outline-none col-span-3"
                                value={count}
                              />
                              <IoMdAdd
                                size={20}
                                color="black"
                                className=" mx-2 my-2 cursor-pointer"
                                onClick={increment}
                              />
                              <RiSubtractFill
                                size={20}
                                color="black"
                                className=" my-2 cursor-pointer"
                                onClick={decrement}
                              />
                            </div>

                            <Select>
                              <SelectTrigger className="w-[200px] ">
                                <SelectValue placeholder="Select a Durution" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="Days">Days</SelectItem>
                                  <SelectItem value="Weeks">Weeks</SelectItem>
                                  <SelectItem value="Months">Months</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </TabsContent>
                        <TabsContent value="ongoing">
                          <p className=" text-xs mx-3 my-3">
                            How do you want to pay for this ongoing project?
                          </p>
                          <Tabs
                            defaultValue="hourly"
                            className="  w-60 p-2 my-2"
                          >
                            <TabsList className=" py-6 mx-3 w-[400px]">
                              <TabsTrigger
                                value="hourly"
                                className=" py-2 mx-3 w-[400px]"
                              >
                                HOURLY
                              </TabsTrigger>
                              <TabsTrigger
                                value="weekly"
                                className=" py-2 mx-3 w-[400px]"
                              >
                                WEEKLY
                              </TabsTrigger>
                              <TabsTrigger
                                value="monthly"
                                className=" py-2 mx-3 w-[400px]"
                              >
                                MONTHLY
                              </TabsTrigger>
                            </TabsList>
                            <TabsContent
                              value="hourly"
                              className="  grid grid-cols-3  w-[400px] mx-2 gap-2.5"
                            >
                              <div className="input grid w-full  items-center gap-2.5 mx-2 my-3">
                                <Label htmlFor="email" className=" text-xs">
                                  Min. rate
                                </Label>
                                <Input
                                  type="email"
                                  id="email"
                                  placeholder="$75"
                                />
                              </div>
                              <div className="input grid w-full max-w-sm items-center gap-1.5 mx-2 my-3">
                                <Label htmlFor="email" className=" text-xs">
                                  Max. rate
                                </Label>
                                <Input
                                  type="email"
                                  id="email"
                                  placeholder="$ 125"
                                />
                              </div>
                              <div className="input grid w-full max-w-sm items-center gap-1.5 mx-2 my-3">
                                <Label htmlFor="email" className=" text-xs">
                                  Max. hours per week
                                </Label>
                                <Input
                                  type="email"
                                  id="email"
                                  placeholder="0"
                                />
                              </div>
                              <p className=" text-xs w-full mx-2">
                                We review every job to ensure a high quality
                                marketplace
                              </p>
                            </TabsContent>
                            <TabsContent
                              value="weekly"
                              className=" grid grid-cols-2 gap-2.5 w-[400px]"
                            >
                              <div className="input grid   w-[200px] items-center gap-2.5 mx-2 my-3">
                                <Label htmlFor="email" className=" text-xs">
                                  Min. rate
                                </Label>
                                <Input
                                  type="email"
                                  id="email"
                                  placeholder="$75"
                                />
                              </div>
                              <div className="input grid w-[200px]  items-center gap-2.5 mx-2 my-3">
                                <Label htmlFor="email" className=" text-xs">
                                  Min. rate
                                </Label>
                                <Input
                                  type="email"
                                  id="email"
                                  placeholder="$75"
                                />
                              </div>
                              <p className=" text-xs mx-2">
                                We review every job to ensure a high quality
                                marketplace
                              </p>
                            </TabsContent>

                            <TabsContent
                              value="monthly"
                              className=" grid grid-cols-2  w-[400px] mx-2 gap-3.5"
                            >
                              <div className="input grid   w-[200px] items-center gap-2.5 mx-2 my-3">
                                <Label htmlFor="email" className=" text-xs">
                                  Min. rate
                                </Label>
                                <Input
                                  type="email"
                                  id="email"
                                  placeholder="$ 5,000"
                                />
                              </div>
                              <div className="input grid w-[200px]  items-center gap-2.5 mx-2 my-3">
                                <Label htmlFor="email" className=" text-xs">
                                  Min. rate
                                </Label>
                                <Input
                                  type="email"
                                  id="email"
                                  placeholder="$ 8,000"
                                />
                              </div>
                              <p className=" text-xs mx-2">
                                We review every job to ensure a high quality
                                marketplace
                              </p>
                            </TabsContent>
                          </Tabs>
                        </TabsContent>
                      </Tabs>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction onClick={handleSave}>
                      Save
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            {display && (
              <p className="text-xs font-medium my-2">
                {'$' +
                  form.getValues().maxRate +
                  ' - ' +
                  '$' +
                  form.getValues().minRate}
              </p>
            )}
          </div> */}

            <div className="mb-6">
              <Label className="font-bold text-sm">Tools</Label>
              <FormField
                control={form.control}
                name="languages"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <MultipleSelector
                        options={skillsOptions}
                        placeholder="Add tools"
                        loadingIndicator={
                          <p className="py-2 text-center text-lg leading-10 text-muted-foreground">
                            loading...
                          </p>
                        }
                        emptyIndicator={
                          <p className="w-full text-center text-lg leading-10 text-muted-foreground">
                            no results found.
                          </p>
                        }
                        onSelectCreate={(value: string) => {
                          const data = { skill: value };
                          addSkillMutation(data);
                        }}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      JavaScript, TypeScript, Python, React, Node
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* <div className="mb-6">
            <Label className="font-bold text-sm">Time Zone</Label>
            <FormField
              control={form.control}
              name="timeZone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Select Time Zone"
                      className="text-sm border px-4 py-2 rounded-md w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>e.g., PST, EST, GMT</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div> */}

            <div className="mb-6">
              <Label className="font-bold text-sm">Job Details</Label>
              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <textarea
                        placeholder="Provide a detailed description of the job"
                        className="w-full h-[200px] p-4 border rounded-md resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full py-3 text-sm bg-primary text-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Post Job
              </button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default JobNewPost;
