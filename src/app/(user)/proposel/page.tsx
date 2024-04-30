'use client';
import { TypeSelectSchema, selectSchema } from '@/data/selectSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import '@/app/index.module.css';
import { IoMdAddCircle } from 'react-icons/io';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const ProposelPage = () => {
  const [showTabs, setTabs] = useState(false);
  const [showOnGoingTabs, setOnGoingShowTabs] = useState(false);
  const handleOneTimeClick = () => {
    setTabs(true);
    setOnGoingShowTabs(false);
  };
  const handleOnGoingClick = () => {
    setOnGoingShowTabs(true);
    setTabs(false);
  };
  return (
    <div className=" flex justify-center items-center flex-col h-[100vh] bg-gray-100">
      <div className="text w-[50%]">
        <h3 className=" text-2xl  font-bold">Create a project</h3>
        <p className="my-2 text-xs">
          Add who you’re working with, payment details, and project scope
        </p>
      </div>

      <div className="Accordian  my-2 w-[51%]">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem
            value="item-1"
            className=" rounded-[10px]   px-2  py-2 my-2 bg-white"
          >
            <AccordionTrigger className=" font-semibold">
              {' '}
              1 . Basic Information
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid w-full max-w-sm items-center gap-1.5 sm:mx-3 my-3">
                <Label htmlFor="email" className=" my-1 text-xs  text-gray-400">
                  Who are you working with?
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Select Search By Email"
                  className=" w-full"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5  sm:mx-3 my-3">
                <Label htmlFor="email" className=" my-1 text-xs  text-gray-400">
                  Project name
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="eg. Website design, 4 pages"
                  className=" w-full"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-2"
            className=" rounded-[10px]  px-2  py-2 my-2 bg-white"
          >
            <AccordionTrigger className="  font-semibold">
              2 . Payment Details
            </AccordionTrigger>
            <AccordionContent>
              <p className=" mx-3  ">
                What type of project are you looking to set up?
              </p>
              <div className=" grid grid-cols-1 sm:grid-cols-3 w-full my-3 cursor-pointer  ">
                <div
                  className=" my-2 text-center border mx-2 p-5 rounded-[10px]"
                  onClick={() => handleOneTimeClick()}
                >
                  <p className=" font-bold w-full"> One time</p>
                  <p className=" text-gray-400 text-xs w-full my-1">
                    Best for single projects with a clear start and end date
                  </p>
                </div>

                <div
                  className="text-center border mx-2 my-2  p-5 cursor-pointer rounded-[10px]"
                  onClick={() => handleOnGoingClick()}
                >
                  <p className=" font-bold w-full"> Ongoing</p>
                  <p className=" text-gray-400 text-xs w-full my-1">
                    Best for ongoing projects where the end date is undefined
                  </p>
                </div>
                <div className="text-center border mx-2  my-2 p-5 cursor-pointer rounded-[10px]">
                  <p className=" font-bold w-full"> Milestone</p>
                  <p className=" text-gray-400 text-xs w-full my-1">
                    Best for projects with multiple checkpoints
                  </p>
                </div>
              </div>
              {showTabs && <OneTime />}
              {showOnGoingTabs && <OnGoing />}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="item-3"
            className=" rounded-[10px]  px-2  py-2 my-2 bg-white"
          >
            <AccordionTrigger className="  font-semibold">
              {' '}
              3 . Project Scope
            </AccordionTrigger>
            <AccordionContent>
              <p className=" sm:mx-3 text-sm">
                Add a brief description or overview of your project.
              </p>
              <div className=" sm:mx-3 w-full border h-[20vh] my-3">
                <input
                  type="text"
                  placeholder=" Add a Project Scope "
                  className=" text-sm my-3 w-full mx-3 border-none outline-none"
                ></input>
              </div>
              <p className=" mx-3 my-3 text-gray-400 text-xs">
                List the deliverables you expect to be completed by the end of
                this project
              </p>
              <div className=" px-2.5 py-2.5 mx-3 my-5   bg-gray-600">
                <Input
                  type="email"
                  placeholder="Deliverable title"
                  className=" my-3"
                />
                <Input
                  type="email"
                  placeholder="A clear, concise deliverable description"
                  className="inline-block my-3  py-10 overflow-wrap-break"
                />
              </div>
              <li className="  cursor-pointer text-sm font-semibold  mx-3 list-none">
                {' '}
                <IoMdAddCircle className="  inline-block  w-[30px] h-[30px]" />{' '}
                Add Another deliverable{' '}
              </li>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

const OneTime = () => {
  return (
    <>
      {' '}
      <div className=" mx-3 ">
        <Tabs defaultValue="fixedAmount" className="w-full sm:w-[500px]">
          <TabsList className=" my-8 sm:mx-3 sm:w-500px] grid sm:grid-cols-2 grid-cols-1">
            <TabsTrigger value="fixedAmount" className=" w-full ">
              Fixed Amount
            </TabsTrigger>
            <TabsTrigger value="hourlyAmount" className="w-full ">
              Hourly Amount
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="fixedAmount"
            className="grid grid-cols-1 sm:grid-cols-2   "
          >
            <div className="  mx-3 ">
              <Label htmlFor="email" className=" text-xs">
                Total fee
              </Label>
              <Input type="text" id="Total fee" placeholder="$  USD " />
            </div>
            <div className="mx-3">
              <Label htmlFor="Upfront payment" className=" text-xs">
                Upfront payment
              </Label>
              <Input type="text" id="Upfront payment" placeholder="0" />
            </div>
            <div className="  mx-3 sm:my-3 ">
              <Label htmlFor="startDate" className=" text-xs">
                Start Date
              </Label>
              <Input type="date" id="StartDate" />
            </div>
            <div className="  mx-3 sm:my-3 ">
              <Label htmlFor="endDate" className=" text-xs">
                End Date
              </Label>
              <Input type="date" id="endDate" />
            </div>
            <Button
              type="submit"
              className=" mx-3 my-5 w-full px-1 sm:w-[100px]  rounded-[20px]"
            >
              Next
            </Button>
          </TabsContent>
          <TabsContent
            value="hourlyAmount"
            className=" grid sm:grid-cols-2 grid-cols-1"
          >
            <div className="mx-3">
              <Label htmlFor="email" className=" text-xs">
                Hourly rate
              </Label>
              <Input type="text" id="HourlyRate" placeholder="$ USD /hr" />
            </div>
            <div className="mx-3">
              <Label htmlFor="MaxHours" className=" text-xs">
                Max Hours
              </Label>
              <Input type="number" id="number" placeholder="Max Hours" />
            </div>
            <div className="  mx-3 sm:my-3 ">
              <Label htmlFor="startDate" className=" text-xs">
                Start Date
              </Label>
              <Input type="date" id="StartDate" />
            </div>
            <div className="  mx-3 sm:my-3 ">
              <Label htmlFor="endDate" className=" text-xs">
                End Date
              </Label>
              <Input type="date" id="endDate" />
            </div>
            <Button
              type="submit"
              className=" mx-3 my-5 w-full px-1 sm:w-[100px]  rounded-[20px]"
            >
              Next
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

const OnGoing = () => {
  const form = useForm<TypeSelectSchema>({
    resolver: zodResolver(selectSchema),
    defaultValues: {
      Frequency: '',
    },
  });
  const { handleSubmit, reset, control } = form;

  const onSubmit = async (data: TypeSelectSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      reset();
    } catch (err) {
      // notifyError(data?.error?.data?.error);
    }
  };
  return (
    <>
      <p className="sm:mx-5 font-bold">
        {' '}
        How do you want to pay for this ongoing project?{' '}
      </p>
      <Tabs defaultValue="fixedAmount" className="w-full  p-5 ">
        <TabsList className=" w-auto sm:w-full p-5  ">
          <div className=" w-auto  grid-cols-1 grid sm:grid-cols-2 sm:w-full my-5">
            <TabsTrigger value="fixedAmount" className=" w-auto sm:w-full ">
              Fixed Amount
            </TabsTrigger>
            <TabsTrigger value="hourlyAmount" className=" w-auto sm:w-full ">
              Hourly Amount
            </TabsTrigger>
          </div>
        </TabsList>
        <TabsContent value="fixedAmount">
          <div className=" grid grid-cols-2 mx-5  p-5 ">
            <div className="Frequency mx-5  ">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-2/3 space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="Frequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Frequency</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="m@example.com">
                              Weekly
                            </SelectItem>
                            <SelectItem value="m@google.com">
                              Bi-weekly
                            </SelectItem>
                            <SelectItem value="m@support.com">
                              Monthly
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </div>
            <div className="Frequency">
              <div className="Frequency">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-2/3 space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="hii mx-5"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rate</FormLabel>
                          <Input
                            type="text"
                            id="HourlyRate"
                            placeholder="$ USD /wk"
                          />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </div>
            </div>
            <div className=" my-3  col-span-2">
              <Label className=" mx-5">Start date</Label>
              <Input type="date" id="HourlyRate" className="mx-5 my-2" />
            </div>
          </div>
          <div className=" grid grid-cols-2">
             </div>
        </TabsContent>
        <TabsContent value="hourlyAmount">
          Change your password here.
        </TabsContent>
      </Tabs>
    </>
  );
};
export default ProposelPage;
