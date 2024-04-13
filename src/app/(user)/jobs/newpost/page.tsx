'use client';

import { toolsSchema, TypeToolsSchema } from '../components/toolsData';
import { IoMdAdd } from 'react-icons/io';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
  FormLabel,
  Form,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  useAddSkillMutation,
  useGetSkillsQuery,
  useRegisterMutation,
} from '@/redux/api/authApi';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegClock } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa6';
import { TfiMoney } from 'react-icons/tfi';
import { RiSubtractFill } from 'react-icons/ri';
import { NavigationMenuDemo } from '@/app/(user)/jobs/newpost/components/navbar';
import { date } from 'zod';
const JobNewPost = () => {
  const { data: skillsOptions = [] } = useGetSkillsQuery(); // Use the hook to
  const [addSkillMutation, {}] = useAddSkillMutation();
  const [newPost, setNewpost] = useState({
    jobTitle: '',
    skills: [],
    tools: [],
    minRateMaxRate: '',
  });
  console.log(newPost);

  const tools = useForm<TypeToolsSchema>({
    resolver: zodResolver(toolsSchema),
    mode: 'onChange',
    defaultValues: {
      tools: [],
      skills: [],
    },
  });
  const onSubmitTools = async (data: TypeToolsSchema) => {
    console.log('hello');
  };
  const addSkillToNewPost = (selectedSkills: any) => {
    setNewpost((prevPost) => ({
      ...prevPost,
      skills: selectedSkills,
    }));
  };
  const [display, setDisplay] = useState(false);
  const [oneTimeRate, setOneTimeRate] = useState<{
    minRate: number;
    maxRate: number;
  }>({ minRate: 0, maxRate: 0 });

  const handleOneTimeRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setOneTimeRate((prevState) => ({
      ...prevState,
      [name]: value, // Ensure to parse value to float or integer if needed
    }));
  };
  console.log(oneTimeRate);

  function handleSave() {
    setDisplay(!display);
  }
  const [count, setCount] = useState(0);
  function increment() {
    setCount(count + 1);
  }
  function decrement() {
    if (count > 0) {
      setCount(count - 1);
    }
  }

  return (
    <>
      <NavigationMenuDemo />

      <div className="  grid grid-cols-1 gap-1  place-content-center  place-items-center p-5    my-5 mx-5   ">
        <div className=" mx-10  mt-10 sm:w-[500px] w-auto ">
          <Label className=" block   font-bold text-sm">Job Title</Label>
          <input
            type="text"
            placeholder=" Add a Descriptive Title"
            className=" text-2xl my-4 border-none outline-none px-5 "
            name="jobTitle"
            value={newPost.jobTitle}
            onChange={(e) =>
              setNewpost({ ...newPost, jobTitle: e.target.value })
            }
          />
        </div>
        <div className=" my-5 mx-5   flex-col p-2 border  rounded-[10px]  ">
          <div className=" mx-10  mt-5 sm:w-[500px]   px-[15px] ">
            <Label className="   font-bold text-sm">Skills</Label>

            <Form {...tools}>
              <form
                onSubmit={tools.handleSubmit(onSubmitTools)}
                className="w-2/3 space-y-6"
              >
                <FormField
                  control={tools.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <MultipleSelector
                          options={skillsOptions}
                          creatable
                          placeholder="Add upto three skills"
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
              </form>
            </Form>
          </div>
          <div className=" mx-10   mt-5 sm:w-[500px]   px-[15px]">
            <Label className="   font-bold text-sm">Tools</Label>

            <Form {...tools}>
              <form
                onSubmit={tools.handleSubmit(onSubmitTools)}
                className="w-2/3 space-y-6"
              >
                <FormField
                  control={tools.control}
                  name="tools"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <MultipleSelector
                          options={skillsOptions}
                          creatable
                          placeholder="Add upto three tools"
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
                        Figma , PhotoShop , Adobe XD
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>

          <div className=" mx-10  mt-5 sm:w-[500px]   px-[15px] ">
            <Label className="   font-bold text-sm">Budget & duration</Label>{' '}
            <br />
            {display ? (
              <li className=" mx-1 text-xs font-medium flex justify-start my-2">
                {' '}
                {'$' + oneTimeRate.maxRate + ' - ' + '$' + oneTimeRate.minRate}
              </li>
            ) : (
              ''
            )}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className="  inline-block  bg-gray-100 px-3 py-3 rounded-[50px] my-1 cursor-pointer">
                  <FaPen color="  gray" />
                </div>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Set budget and duration</AlertDialogTitle>
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
                          <FaRegClock className=" mx-2" /> <span>Ongoing</span>
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="one-time">
                        <div className="category grid grid-cols-2  place-content-center w-[400px] my-1 ">
                          <div className=" w-[200px]">
                            {' '}
                            <Label htmlFor="Min.rate" className=" mx-3">
                              Min. rate
                            </Label>
                            <Input
                              type="number"
                              id="number"
                              placeholder="$ 2,500"
                              className=" my-1 mx-3"
                              onChange={handleOneTimeRate}
                              value={oneTimeRate.minRate}
                              name="minRate"
                            />
                          </div>
                          <div className=" mx-3 w-[200px]">
                            {' '}
                            <Label htmlFor="Min.rate" className=" mx-3">
                              Max. rate
                            </Label>
                            <Input
                              type="number"
                              id="text"
                              placeholder="$ 5,000"
                              className=" my-1 mx-3"
                              onChange={handleOneTimeRate}
                              value={oneTimeRate.maxRate}
                              name="maxRate"
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
                        <Tabs defaultValue="hourly" className="  w-60 p-2 my-2">
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
                              <Input type="email" id="email" placeholder="0" />
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
        </div>
        <div className="  sm:w-[630px]  sm:h-[200px]  px-[15px] grid grid-cols-1 gap-1 my-5 ">
          <Label className=" block mx-6 ">Job details</Label>
          <p className=" rounded-[10px] border px-3 py-3 sm:w-[600px] sm:h-[150px] ">
            {/* <input type="text" placeholder=' A description helps contractors better understand the scope and
          requirements of your job. This is also a great place to include key

          deliverables, links or examples.'  className=' border-none outline-none  w-full overflow-scroll'/> */}
            <textarea
              placeholder="A description helps contractors better understand the scope and
          requirements of your job. This is also a great place to include key

          deliverables, links or examples."
              className=" border-none outline-none  overflow-hidden w-full"
            ></textarea>
          </p>
        </div>
        <div className="  mx-10  mt-3  sm:w-[628px] py-5 border w-full  px-[15px] grid grid-cols-1 gap-1 my-5">
          <p>How many contractors are you hiring?</p>
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
        </div>
      </div>
    </>
  );
};

export default JobNewPost;
