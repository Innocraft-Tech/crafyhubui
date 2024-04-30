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

  const form = useForm<TypeToolsSchema>({
    resolver: zodResolver(toolsSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      tools: [],
      skills: [],
      minRate: '',
      maxRate: '',
      jobDetails: '',
      timeZone: '',
    },
  });
  const onSubmit=async(data:TypeToolsSchema)=>{
      const {title,tools,skills,minRate,maxRate,jobDetails,...body}=data;
        
      
  }
  const { handleSubmit, control, getValues } = form;
  const { title, tools, skills, minRate, maxRate, jobDetails } = getValues();
  const onSubmitTools = async (data: TypeToolsSchema) => {
    console.log('hello');
  };
  const [display, setDisplay] = useState(false);
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

  const [jobData, setJobData] = useState([]);

  // useEffect(() => {
  //   fetch('http://localhost:8080/job/p-job')
  //     .then((response) => response.json())
  //     .then((data) => setJobData(data))
  //     .catch((error) => console.log('Error fetching job data:', error));
  // }, []);
  // console.log('jobData'+ jobData);

  return (
    <>
      <NavigationMenuDemo values={getValues()} />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitTools)}
          className=" space-y-6"
        >
          <div className="  grid grid-cols-1 gap-1  place-content-center  place-items-center p-5    my-5 sm:mx-5   ">
            <div className="  my-5 mx-5 w-full sm:w-[40%] flex-col p-2 border  rounded-[10px]   ">
              <Label className="  font-bold text-sm">Job Title</Label>

              <FormField
                control={control}
                name={`title`}
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Title</FormLabel> */}
                    <FormControl>
                      <input
                        type="text"
                        placeholder=" Add a Descriptive Title"
                        className=" text-2xl my-4 border-none outline-none px-0 sm:px-4 "
                        {...field}
                      />
                      {/* <Input type="text" placeholder="" {...field} /> */}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className=" my-5 mx-5   flex-col p-2 border  rounded-[10px]  ">
              <div className=" mx-10  mt-5 sm:w-[500px]   px-[15px] ">
                <Label className="   font-bold text-sm">Skills</Label>

                <FormField
                  control={form.control}
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

                <Label className="font-bold text-sm">Tools</Label>

                <FormField
                  control={form.control}
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

                <div className="   mt-5 sm:w-[500px]   px-[5px] ">
                  <Label className="    font-bold text-sm">
                    Budget & duration
                  </Label>{' '}
                  <br />
                  {display ? (
                    <li className=" mx-1 text-xs font-medium flex justify-start my-2">
                      {' '}
                      {'$' + maxRate + ' - ' + '$' + minRate}
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
                        <AlertDialogTitle>
                          Set budget and duration
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          <p className=" font-bold text-xs  text-gray-800">
                            {' '}
                            What type of project do you need?
                          </p>

                          <Tabs
                            defaultValue="one-time"
                            className="  w-60 p-2 my-2"
                          >
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
                                      <SelectItem value="Weeks">
                                        Weeks
                                      </SelectItem>
                                      <SelectItem value="Months">
                                        Months
                                      </SelectItem>
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
              </div>
              <div className="  sm:w-[630px]  sm:h-[200px]  px-[15px] grid grid-cols-1 gap-1 my-5 ">
                <Label className=" block mx-6 ">Job details</Label>
                <p className=" rounded-[10px] border px-3 py-3 sm:w-[600px] sm:h-[150px] ">
                  <FormField
                    control={form.control}
                    name="jobDetails"
                    render={({ field }) => (
                      <FormControl>
                        <FormItem>
                          <textarea
                            placeholder="A description helps contractors better understand the scope and
          requirements of your job. This is also a great place to include key

          deliverables, links or examples."
                            className=" border-none outline-none  overflow-hidden w-full"
                            {...field}
                          ></textarea>
                        </FormItem>
                      </FormControl>
                    )}
                  />
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
              <div className=" mx-5 p-5 border grid grid-cols-2">
                <FormField
                  name="timeZone"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select>
                          <SelectTrigger className="w-[280px]">
                            <SelectValue placeholder="Select a timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>North America</SelectLabel>
                              <SelectItem value="est">
                                Eastern Standard Time (EST)
                              </SelectItem>
                              <SelectItem value="cst">
                                Central Standard Time (CST)
                              </SelectItem>
                              <SelectItem value="mst">
                                Mountain Standard Time (MST)
                              </SelectItem>
                              <SelectItem value="pst">
                                Pacific Standard Time (PST)
                              </SelectItem>
                              <SelectItem value="akst">
                                Alaska Standard Time (AKST)
                              </SelectItem>
                              <SelectItem value="hst">
                                Hawaii Standard Time (HST)
                              </SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                              <SelectLabel>Europe & Africa</SelectLabel>
                              <SelectItem value="gmt">
                                Greenwich Mean Time (GMT)
                              </SelectItem>
                              <SelectItem value="cet">
                                Central European Time (CET)
                              </SelectItem>
                              <SelectItem value="eet">
                                Eastern European Time (EET)
                              </SelectItem>
                              <SelectItem value="west">
                                Western European Summer Time (WEST)
                              </SelectItem>
                              <SelectItem value="cat">
                                Central Africa Time (CAT)
                              </SelectItem>
                              <SelectItem value="eat">
                                East Africa Time (EAT)
                              </SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                              <SelectLabel>Asia</SelectLabel>
                              <SelectItem value="msk">
                                Moscow Time (MSK)
                              </SelectItem>
                              <SelectItem value="ist">
                                India Standard Time (IST)
                              </SelectItem>
                              <SelectItem value="cst_china">
                                China Standard Time (CST)
                              </SelectItem>
                              <SelectItem value="jst">
                                Japan Standard Time (JST)
                              </SelectItem>
                              <SelectItem value="kst">
                                Korea Standard Time (KST)
                              </SelectItem>
                              <SelectItem value="ist_indonesia">
                                Indonesia Central Standard Time (WITA)
                              </SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                              <SelectLabel>Australia & Pacific</SelectLabel>
                              <SelectItem value="awst">
                                Australian Western Standard Time (AWST)
                              </SelectItem>
                              <SelectItem value="acst">
                                Australian Central Standard Time (ACST)
                              </SelectItem>
                              <SelectItem value="aest">
                                Australian Eastern Standard Time (AEST)
                              </SelectItem>
                              <SelectItem value="nzst">
                                New Zealand Standard Time (NZST)
                              </SelectItem>
                              <SelectItem value="fjt">
                                Fiji Time (FJT)
                              </SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                              <SelectLabel>South America</SelectLabel>
                              <SelectItem value="art">
                                Argentina Time (ART)
                              </SelectItem>
                              <SelectItem value="bot">
                                Bolivia Time (BOT)
                              </SelectItem>
                              <SelectItem value="brt">
                                Brasilia Time (BRT)
                              </SelectItem>
                              <SelectItem value="clt">
                                Chile Standard Time (CLT)
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Ofset" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1 hours">± 1 Hour</SelectItem>
                    <SelectItem value="2 hours">± 2 Hours</SelectItem>
                    <SelectItem value="3 hours">± 3 Hours</SelectItem>
                    <SelectItem value="4 hours">± 4 Hours</SelectItem>
                    <SelectItem value="5 hours">± 5 Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};

export default JobNewPost;
