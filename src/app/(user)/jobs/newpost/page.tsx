'use client';
import HandleResponse from '@/components/common/HandleResponse';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SOMETHING_WENT_WRONG, isMyKnownError } from '@/lib/api';
import useUserInfo from '@/lib/hooks/useUserInfo';
import { useAddSkillMutation, useGetSkillsQuery } from '@/redux/api/authApi';
import { usePostJobMutation } from '@/redux/api/jobApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { redirect } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { FaPen, FaRegClock } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import { RiSubtractFill } from 'react-icons/ri';
import { TfiMoney } from 'react-icons/tfi';
import { z } from 'zod';
import { jobsSchema } from '../components/toolsData';
import { TabContent } from './components/tabContent';
export type JobsToolsSchema = z.infer<typeof jobsSchema>;

const JobNewPost = () => {
  const { token } = useUserInfo();
  const { data: skillsOptions = [] } = useGetSkillsQuery();
  const [addSkillMutation] = useAddSkillMutation();
  const [
    postJob,
    { data: successData = {}, isLoading, isSuccess, isError, error },
  ] = usePostJobMutation();

  // if (isLoading) {
  //   return (
  //     <div className="flex min-h-[75vh] items-center justify-center">
  //       {/* <LoaderIcon className="my-28 h-16 w-16 animate-spin text-primary/60" /> */}
  //       <ProgressBar />
  //     </div>
  //   );
  // }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const form = useForm<JobsToolsSchema>({
    resolver: zodResolver(jobsSchema),
    mode: 'onChange',
    defaultValues: {
      jobTitle: '',
      languages: [],
      requiredSkills: [],
      paymentOneTime: true,
      paymentOngoing: false,
      oneTime: ['', '', '', 'Days'],
      onGoing: ['hourly', '', '', ''],
      jobDescription: '',
    },
  });

  const {
    handleSubmit,
    setValue,
    getValues,
    watch,
    control,
    formState: { errors },
  } = form;
  const paymentOneTime = watch('paymentOneTime');

  const onSubmit = async (data: JobsToolsSchema) => {
    postJob({ data, id: token });
  };

  const increment = () => {
    const currentValue = getValues('oneTime')[2] as number;
    setValue('oneTime.2', currentValue + 1);
  };

  const decrement = () => {
    const currentValue = getValues('oneTime')[2] as number;
    if (currentValue > 0) {
      setValue('oneTime.2', currentValue - 1);
    }
  };

  const handleTabChange = (tab: string) => {
    switch (tab) {
      case 'hourly':
        setValue('onGoing', ['hourly', '', '', '']);
        break;
      case 'weekly':
        setValue('onGoing', ['weekly', '', '']);
        break;
      case 'monthly':
        setValue('onGoing', ['monthly', '', '']);
        break;
    }
  };

  const onSuccess = () => {
    redirect('/jobs');
  };

  console.log(errors, 'error', getValues());

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
          onSubmit={handleSubmit(onSubmit)}
          className="container mx-auto p-5"
        >
          <div className="mx-auto w-full rounded-md border p-6 sm:w-[60%]">
            <div className="mb-6">
              <Label className="text-sm font-bold">Job Title</Label>
              <FormField
                control={control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Add a descriptive title"
                        className="my-4 w-full rounded-md border px-4 py-2 text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mb-6">
              <Label className="text-sm font-bold">Skills</Label>
              <FormField
                control={control}
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

            <div className="mb-6">
              <div className="flex items-center gap-4">
                <Label className="text-sm font-bold">Budget & Duration</Label>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div className="my-1 inline-block cursor-pointer rounded-[50px] bg-gray-100 px-3 py-3">
                      <FaPen color="gray" />
                    </div>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Set Budget and Duration
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        <p className="mb-4 text-sm font-medium">
                          What type of project do you need?
                        </p>

                        <Tabs
                          value={
                            paymentOneTime ? 'paymentOneTime' : 'paymentOngoing'
                          }
                          onValueChange={(value) => {
                            setValue(
                              'paymentOneTime',
                              value === 'paymentOneTime',
                            );
                            setValue(
                              'paymentOngoing',
                              value === 'paymentOngoing',
                            );
                          }}
                          className="mt-2 w-full"
                        >
                          <TabsList className="w-full py-6">
                            <TabsTrigger
                              value="paymentOneTime"
                              className="mx-3 w-full py-2"
                            >
                              <TfiMoney className="mx-2" /> One Time
                            </TabsTrigger>
                            <TabsTrigger
                              value="paymentOngoing"
                              className="mx-3 w-full py-2"
                            >
                              <FaRegClock className="mx-2" />
                              <span>Ongoing</span>
                            </TabsTrigger>
                          </TabsList>
                          <TabsContent value="paymentOneTime">
                            <div className="category my-1 grid grid-cols-2 place-content-center gap-5">
                              <div className="">
                                <FormField
                                  control={control}
                                  name="oneTime.0"
                                  render={({ field }) => (
                                    <FormControl>
                                      <FormItem>
                                        <Label htmlFor="minRate" className="">
                                          Min. rate
                                        </Label>
                                        <Input
                                          type="text"
                                          id="minRate"
                                          placeholder="$ 2,500"
                                          className="my-1"
                                          {...field}
                                        />
                                        <FormMessage />
                                      </FormItem>
                                    </FormControl>
                                  )}
                                />
                              </div>
                              <div className="">
                                <FormField
                                  control={control}
                                  name="oneTime.1"
                                  render={({ field }) => (
                                    <FormControl>
                                      <FormItem>
                                        <Label htmlFor="maxRate" className="">
                                          Max. rate
                                        </Label>
                                        <Input
                                          type="text"
                                          id="maxRate"
                                          placeholder="$ 5,000"
                                          className="my-1"
                                          {...field}
                                        />
                                        <FormMessage />
                                      </FormItem>
                                    </FormControl>
                                  )}
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                              <p className="my-3 text-xs">
                                We review every job to ensure a high quality
                                marketplace
                              </p>
                              <span className="my-3 block text-xs">
                                When do you need this project delivered by?
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-5">
                              <div className="grid grid-cols-5 gap-1 border">
                                <Controller
                                  control={control}
                                  name="oneTime.2"
                                  render={({ field }) => (
                                    <input
                                      type="number"
                                      id="thirdValue"
                                      className="col-span-3 m-auto mx-3 px-2 py-2 outline-none"
                                      readOnly
                                      value={field.value}
                                    />
                                  )}
                                />
                                <IoMdAdd
                                  size={20}
                                  color="black"
                                  className="mx-2 my-2 cursor-pointer"
                                  onClick={increment}
                                />
                                <RiSubtractFill
                                  size={20}
                                  color="black"
                                  className="my-2 cursor-pointer"
                                  onClick={decrement}
                                />
                              </div>

                              <Controller
                                control={control}
                                name="oneTime.3"
                                render={({ field }) => (
                                  <Select
                                    value={(field.value as string) || ''}
                                    onValueChange={(value) => {
                                      field.onChange(value);
                                    }}
                                  >
                                    <SelectTrigger className="">
                                      <SelectValue placeholder="Select a Duration" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectGroup>
                                        <SelectItem value="Days">
                                          Days
                                        </SelectItem>
                                        <SelectItem value="Weeks">
                                          Weeks
                                        </SelectItem>
                                        <SelectItem value="Months">
                                          Months
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                )}
                              />
                            </div>
                          </TabsContent>
                          <TabsContent value="paymentOngoing">
                            <p className="my-3 text-xs">
                              How do you want to pay for this ongoing project?
                            </p>
                            <Tabs
                              defaultValue="hourly"
                              className="my-2"
                              onValueChange={handleTabChange}
                            >
                              <TabsList className="w-full py-6">
                                <TabsTrigger
                                  value="hourly"
                                  className="w-full py-2"
                                >
                                  HOURLY
                                </TabsTrigger>
                                <TabsTrigger
                                  value="weekly"
                                  className="w-full py-2"
                                >
                                  WEEKLY
                                </TabsTrigger>
                                <TabsTrigger
                                  value="monthly"
                                  className="w-full py-2"
                                >
                                  MONTHLY
                                </TabsTrigger>
                              </TabsList>

                              <TabContent
                                value={'hourly'}
                                control={control}
                                errors={errors}
                              />
                              <TabContent
                                value={'weekly'}
                                control={control}
                                errors={errors}
                              />
                              <TabContent
                                value={'monthly'}
                                control={control}
                                errors={errors}
                              />
                            </Tabs>
                          </TabsContent>
                        </Tabs>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogAction onClick={() => null}>
                        Save
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            <div className="mb-6">
              <Label className="text-sm font-bold">Tools</Label>
              <FormField
                control={control}
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

            <div className="mb-6">
              <Label className="text-sm font-bold">Job Details</Label>
              <FormField
                control={control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <textarea
                        placeholder="Provide a detailed description of the job"
                        className="h-[200px] w-full resize-none rounded-md border p-4"
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
                className="w-full rounded-lg bg-primary py-3 text-sm text-white shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
