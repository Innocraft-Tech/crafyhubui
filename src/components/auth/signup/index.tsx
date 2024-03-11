'use client';
import Image from 'next/image';
import { Card, CardContent } from '../../ui/card';
import { Label } from '../../ui/label';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { TypeSignUpSchema, signUpSchema } from '@/data/signUpData';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import EmailPasswordFormField from '@/components/forms/email-password-form';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon } from 'lucide-react';
import InputField from '@/components/forms/input-field';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';
import { AvatarUpload } from '@/components/ui/avatar-upload';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import clsx from 'clsx';

const OPTIONS: Option[] = [
  { label: 'nextjs', value: 'Nextjs' },
  { label: 'React', value: 'react' },
  { label: 'Remix', value: 'remix' },
  { label: 'Vite', value: 'vite' },
  { label: 'Nuxt', value: 'nuxt' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Angular', value: 'angular' },
  { label: 'Ember', value: 'ember' },
  { label: 'Gatsby', value: 'gatsby' },
  { label: 'Astro', value: 'astro' },
];

const mockSearch = async (value: string): Promise<Option[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const res = OPTIONS.filter((option) => option.value.includes(value));

      resolve(res);
    }, 1000);
  });
};

const stepClassNames = ['px-6', 'sm:w-[350px] mx-auto'];

const SignupForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const form = useForm<TypeSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      tools: [],
      userLocation: '',
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
    getValues,
  } = form;

  const { firstName, lastName } = getValues();

  const onSubmit = (data: TypeSignUpSchema) => {
    console.log(data);
    reset(); // Reset the form after submission
  };

  const type = form.watch('type');

  useEffect(() => {
    if (type) setCurrentStep((step) => step + 1);
  }, [type]);

  const goToNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    setCurrentStep((step) => step + 1);
  };

  const goToPrevious = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    setCurrentStep((step) => step - 1);
  };

  const renderContinueButton = () => {
    const disabled = [
      type,
      getValues().email &&
        getValues().password &&
        !errors.email &&
        !errors.password,
      getValues().firstName &&
        getValues().lastName &&
        !errors.firstName &&
        !errors.lastName,
      getValues().tools?.length > 3 && !errors.tools,
      getValues().userLocation && !errors.userLocation,
      getValues().userLocation && !errors.userLocation,
    ];

    return (
      <div
        className={clsx(
          'flex items-center space-x-4',
          stepClassNames[currentStep],
        )}
      >
        {currentStep !== 0 && (
          <Button
            onClick={goToPrevious}
            variant="outline"
            className="h-10 w-10 p-0 rounded-full"
            type="button"
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon />
          </Button>
        )}
        {currentStep !== 8 && (
          <Button
            disabled={!disabled[currentStep]}
            onClick={goToNext}
            className="rounded-full"
            type="submit"
          >
            Continue
          </Button>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="relative hidden h-full flex-col p-10 text-primary lg:flex dark:border-r">
        <div className="relative z-20 flex items-center text-lg font-medium">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          CrafyHub */}
          <Image src="/logo.svg" alt="logo" width={191} height={42} />
        </div>

        <Card className="p-6 text-center lg:py-8 m-auto w-[450px] bg-[#ebd9e7] border-none shadow-none">
          <h3 className="mb-1.5 text-2xl font-medium ">
            {firstName || lastName ? `${firstName}  ${lastName}` : 'Name'}
          </h3>
          <div className="mt-4 text-left">
            <Avatar className="m-auto w-[129px] h-[129px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="129"
                height="129"
                viewBox="0 0 340 340"
              >
                <path
                  fill="#e9eaed"
                  d="m169,.5a169,169 0 1,0 2,0zm0,86a76,76 0 1 1-2,0zM57,287q27-35 67-35h92q40,0 67,35a164,164 0 0,1-226,0"
                />
              </svg>

              {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
              {/* <AvatarFallback>CN</AvatarFallback> */}
            </Avatar>

            <p className="leading-7 text-left my-5">Skills</p>
            <Badge className="border-dashed px-4 py-3" variant={'outline'}>
              Badge
            </Badge>

            <Separator className="my-4" />
            <p className="leading-7 text-left my-5">Location</p>
            <Separator className="my-4" />
            <p className="leading-7 text-left my-5">Links</p>
          </div>
        </Card>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px] ">
          <Form {...form}>
            <form className="space-y-8">
              <div className="flex flex-col space-y-6">
                {(() => {
                  switch (currentStep) {
                    case 0:
                      return (
                        <FormField
                          control={form.control}
                          name="type"
                          render={({ field }) => (
                            <>
                              <h1 className="text-2xl font-semibold tracking-tight pb-8 text-center">
                                Join as a client or designer
                              </h1>
                              <CardContent className="pb-0 grid gap-6">
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="space-x-2y flex"
                                  >
                                    <FormItem className="flex items-center space-x-2">
                                      <FormControl>
                                        <div>
                                          <RadioGroupItem
                                            id="freelancer"
                                            value="FREELANCER"
                                            className="peer sr-only"
                                          />
                                          <Label
                                            htmlFor="freelancer"
                                            className="flex flex-col items-center justify-between rounded-md cursor-pointer border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                          >
                                            <Image
                                              width={300}
                                              height={300}
                                              alt="work"
                                              src={'/auth/work.svg'}
                                            />

                                            <div className="w-[120px] leading-5">
                                              I am designer Looking for work
                                            </div>
                                          </Label>
                                        </div>
                                      </FormControl>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-2">
                                      <FormControl>
                                        <div>
                                          <RadioGroupItem
                                            id="client"
                                            value="CLIENT"
                                            className="peer sr-only"
                                          />
                                          <Label
                                            htmlFor="client"
                                            className="flex flex-col items-center justify-between rounded-md cursor-pointer border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                                          >
                                            <Image
                                              width={300}
                                              height={300}
                                              alt="client"
                                              src={'/auth/client.svg'}
                                            />
                                            <div className="w-[120px] leading-5">
                                              I am client, hiring for project
                                            </div>
                                          </Label>
                                        </div>
                                      </FormControl>
                                    </FormItem>
                                  </RadioGroup>
                                </FormControl>
                                {/* {renderContinueButton(field.value)} */}
                              </CardContent>
                            </>
                          )}
                        />
                      );
                    case 1:
                      return (
                        <div className="mx-auto flex w-full flex-col justify-center sm:w-[350px]">
                          <div className="space-y-6">
                            <div className="flex flex-col space-y-2 text-center">
                              <h1 className="text-2xl font-semibold tracking-tight text-center">
                                Create you Crafyhub profile
                              </h1>
                              <p className="text-sm text-muted-foreground">
                                Sign up with you email address
                              </p>
                            </div>

                            <EmailPasswordFormField control={form.control} />

                            {/* {renderContinueButton(
                              getValues().email &&
                                getValues().password &&
                                !errors.email &&
                                !errors.password,
                            )} */}
                          </div>
                        </div>
                      );
                    case 2:
                      return (
                        <div className="mx-auto w-full">
                          <div className="space-y-6">
                            <h1 className="text-2xl font-semibold tracking-tight text-left">
                              What&apos;s your name?
                            </h1>
                            <div className="flex items-center space-x-4">
                              <InputField
                                name="firstName"
                                control={form.control}
                                placeholder="First Name"
                              />
                              <InputField
                                name="lastName"
                                control={form.control}
                                placeholder="Last Name"
                              />
                            </div>
                            {/* {renderContinueButton(
                              getValues().firstName &&
                                getValues().lastName &&
                                !errors.firstName &&
                                !errors.lastName,
                            )} */}
                          </div>
                        </div>
                      );
                    case 3:
                      return (
                        <div className="mx-auto w-full">
                          <div className="space-y-6">
                            <h1 className="text-2xl font-semibold tracking-tight text-left">
                              What do you do?
                            </h1>

                            <FormField
                              control={form.control}
                              name="tools"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <MultipleSelector
                                      onSearch={async (value) => {
                                        setIsTriggered(true);
                                        const res = await mockSearch(value);
                                        setIsTriggered(false);
                                        return res;
                                      }}
                                      defaultOptions={[]}
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

                            {/* {renderContinueButton(
                              getValues().tools?.length > 3 && !errors.tools,
                            )} */}
                          </div>
                        </div>
                      );
                    case 4:
                      return (
                        <div className="mx-auto w-full">
                          <div className="space-y-6">
                            <h1 className="text-2xl font-semibold tracking-tight text-left">
                              Where are you located?
                            </h1>
                            <div className="flex items-center space-x-4">
                              <InputField
                                name="userLocation"
                                control={form.control}
                                placeholder="Location"
                              />
                            </div>
                            {/* {renderContinueButton(
                              getValues().userLocation && !errors.userLocation,
                            )} */}
                          </div>
                        </div>
                      );
                    case 5:
                      return (
                        <div className="mx-auto w-full">
                          <div className="space-y-6">
                            <h1 className="text-2xl font-semibold tracking-tight text-left">
                              Where are you located?
                            </h1>
                            <div className="flex items-center space-x-4">
                              <InputField
                                name="userLocation"
                                control={form.control}
                                placeholder="Avatar Upload"
                                type="file"
                                accept="image/*"
                              />
                            </div>
                            {/* {renderContinueButton(
                              getValues().userLocation && !errors.userLocation,
                            )} */}
                          </div>
                        </div>
                      );
                  }
                })()}
                {renderContinueButton()}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
