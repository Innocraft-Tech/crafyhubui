'use client';
import HandleResponse from '@/components/common/HandleResponse';
import EmailPasswordFormField from '@/components/forms/email-password-form';
import InputField from '@/components/forms/input-field';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import ImageUpload from '@/components/ui/image-upload';
import MultipleSelector from '@/components/ui/multiple-selector';
import { Separator } from '@/components/ui/separator';
import { TypeSignUpSchema, signUpSchema } from '@/data/signUpData';
import { SOMETHING_WENT_WRONG, isMyKnownError } from '@/lib/api';
import { setToken } from '@/lib/cookie';

import {
  useAddSkillMutation,
  useGetSkillsQuery,
  useRegisterMutation,
} from '@/redux/api/authApi';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import {
  ChevronLeftIcon,
  Facebook,
  Instagram,
  Linkedin,
  Paperclip,
  Twitter,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent } from '../../ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '../../ui/form';
import { Label } from '../../ui/label';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';

const stepClassNames = ['px-6', 'sm:w-[350px] mx-auto'];

const SignupForm = (): JSX.Element => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo');

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedType, setSelectedType] = useState('');

  const { data: skillsOptions = [] } = useGetSkillsQuery(); // Use the hook to
  const [addSkillMutation] = useAddSkillMutation();

  const [register, { isError, isSuccess, error, data }] = useRegisterMutation();

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
      profilePicture: '',
      isClient: undefined,
      companyName: '',
      isIndividual: false,
      role: '',
      socialLinks: [''],
    },
  });

  const { handleSubmit, reset, formState, getValues, setValue, watch } = form;
  const {
    formState: { isValid },
  } = useForm();

  const { errors } = formState;

  const {
    email,
    password,
    firstName,
    lastName,
    profilePicture,
    tools,
    userLocation,
    companyName,
    isIndividual,
    isClient,
    role,
  } = getValues();

  const socialLinks = watch('socialLinks');

  const onSubmit = async (data: TypeSignUpSchema) => {
    const { userLocation, ...body } = data;

    await register({
      ...body,
      userLocation: [userLocation],
    }).unwrap();

    reset(); // Reset the form after submission
  };

  useEffect(() => {
    if (isClient !== undefined) setCurrentStep((step) => step + 1);
    if (isClient) setValue('tools', []);
  }, [isClient, setValue]);

  useEffect(() => {
    if (isIndividual) {
      setValue('companyName', '');
    }
  }, [isIndividual, setValue]);

  const goToNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if ((isClient && currentStep === 3) || currentStep === 6) {
      handleSubmit(onSubmit)();
      return;
    }

    setCurrentStep((step) => step + 1);
  };

  const goToPrevious = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    setCurrentStep((step) => step - 1);
  };

  const renderContinueButton = () => {
    // next button validation by index
    const disabled = [
      selectedType,
      email && password && !errors.email && !errors.password,
      isClient
        ? !isIndividual
          ? companyName && !errors.companyName
          : true
        : firstName && lastName && !errors.firstName && !errors.lastName,

      isClient
        ? firstName &&
          lastName &&
          !errors.firstName &&
          !errors.lastName &&
          userLocation &&
          !errors.userLocation &&
          role &&
          !errors.role &&
          profilePicture &&
          !errors.profilePicture
        : tools?.length >= 3 && !errors.tools,
      userLocation && !errors.userLocation,
      profilePicture && !errors.profilePicture,
      true,
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
            className="h-10 w-10 rounded-full p-0"
            type="button"
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon />
          </Button>
        )}
        {/* {currentStep !== 8 && ( */}
        <Button
          disabled={!disabled[currentStep]}
          onClick={goToNext}
          className="rounded-full"
          type="submit"
        >
          {(isClient && currentStep === 3) || currentStep === 6
            ? 'Submit'
            : 'Continue'}
        </Button>
        {/* )} */}
      </div>
    );
  };

  const onSuccess = () => {
    setToken(data.token);

    reset();
    replace(redirectTo || '/dashboard');
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
          message={data?.message}
          onSuccess={onSuccess}
        />
      )}

      <div className="relative hidden h-full flex-col p-10 text-primary dark:border-r lg:flex">
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

        <Card className="m-auto w-[450px] border-none bg-[#F7EFF1] p-6 text-center shadow-none lg:py-8">
          <h3 className="mb-1.5 text-2xl font-medium">
            {firstName || lastName ? `${firstName}  ${lastName}` : 'Name'}
          </h3>
          <div className="mt-4 text-left">
            <Avatar className="m-auto h-[129px] w-[129px]">
              {profilePicture ? (
                <AvatarImage src={profilePicture} />
              ) : (
                // {/* <AvatarFallback>CN</AvatarFallback> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="129"
                  height="129"
                  viewBox="0 0 340 340"
                >
                  <path
                    fill="#fff"
                    d="m169,.5a169,169 0 1,0 2,0zm0,86a76,76 0 1 1-2,0zM57,287q27-35 67-35h92q40,0 67,35a164,164 0 0,1-226,0"
                  />
                </svg>
              )}
            </Avatar>
            <p className="my-5 text-left leading-7">
              {isClient ? 'Professional Title' : 'Skills'}
            </p>
            {isClient ? (
              <div className="flex min-h-6 items-center gap-2">
                <Image
                  src={'/auth/location.svg'}
                  alt="location"
                  width={18}
                  height={18}
                />
                <p className="">{role}</p>
              </div>
            ) : tools?.length > 0 ? (
              <div className="inline-flex flex-wrap gap-2 space-x-1.5">
                {tools.map((tool) => (
                  <Badge
                    key={tool}
                    className="border-dashed border-badge px-4 py-3 text-badge"
                    variant={'outline'}
                  >
                    {tool}
                  </Badge>
                ))}
              </div>
            ) : (
              <Badge
                className="border-dashed border-badge px-6 py-3 text-badge"
                variant={'outline'}
              ></Badge>
            )}
            <Separator className="my-4 bg-separator" />
            <p className="my-5 text-left leading-7">Location</p>
            <div className="flex min-h-6 items-center gap-2">
              <Image
                src={'/auth/location.svg'}
                alt="location"
                width={18}
                height={18}
              />
              <p className="">{userLocation}</p>
            </div>
            <Separator className="my-4 bg-separator" />
            <div className="flex flex-row gap-3">
              <p className="my-5 text-left leading-7">Links</p>
              {Array.isArray(socialLinks) &&
                socialLinks.map((link, index) => (
                  <div
                    className={`${
                      link && link?.length > 0
                        ? 'rounded-[8px] bg-white p-1'
                        : ''
                    }`}
                    key={index}
                  >
                    {link?.includes('linkedin.com') ? (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`http://${link}`}
                      >
                        <Linkedin size={20} />
                      </a>
                    ) : link?.includes('facebook.com') ? (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`http://${link}`}
                      >
                        <Facebook size={20} />
                      </a>
                    ) : link?.includes('twitter.com') ? (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`http://${link}`}
                      >
                        <Twitter size={20} />
                      </a>
                    ) : link?.includes('instagram.com') ? (
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={`http://${link}`}
                      >
                        <Instagram size={20} />
                      </a>
                    ) : (
                      link &&
                      link?.length > 0 && (
                        <a href={`http://${link}`}>
                          <Paperclip size={20} />
                        </a>
                      )
                    )}
                  </div>
                ))}
            </div>
          </div>
        </Card>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px]">
          <Form {...form}>
            <form className="space-y-8">
              <div className="flex flex-col space-y-6">
                {(() => {
                  switch (currentStep) {
                    case 0:
                      return (
                        <FormField
                          control={form.control}
                          name="isClient"
                          render={({ field }) => (
                            <>
                              <h1 className="pb-8 text-center text-2xl font-semibold tracking-tight">
                                Join as a client or designer
                              </h1>
                              <CardContent className="grid gap-6 pb-0">
                                <FormControl>
                                  <RadioGroup
                                    // onValueChange={field.onChange}
                                    onValueChange={(value) => {
                                      field.onChange(value === 'CLIENT');

                                      setSelectedType(value);
                                    }}
                                    defaultValue={selectedType}
                                    className="space-x-2y flex"
                                  >
                                    <FormItem className="flex items-center space-x-2">
                                      <FormControl>
                                        <div>
                                          <RadioGroupItem
                                            id="freelancer"
                                            value={'FREELANCER'}
                                            className="peer sr-only"
                                          />
                                          <Label
                                            htmlFor="freelancer"
                                            className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
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
                                            className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
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
                              <h1 className="text-center text-2xl font-semibold tracking-tight">
                                Create you Crafyhub profile
                              </h1>
                              <p className="text-sm text-muted-foreground">
                                Sign up with you email address
                              </p>
                            </div>

                            <EmailPasswordFormField control={form.control} />
                          </div>
                        </div>
                      );
                    case 2:
                      return (
                        <div className="mx-auto w-full">
                          <div className="space-y-6">
                            <h1 className="text-left text-2xl font-semibold tracking-tight">
                              {isClient
                                ? "What's the name of your company?"
                                : "What's your name?"}
                            </h1>
                            <div className="flex items-center space-x-4">
                              {isClient ? (
                                <div className="w-full space-y-4">
                                  <InputField
                                    name="companyName"
                                    control={form.control}
                                    placeholder="Company Name"
                                    disabled={isIndividual}
                                  />
                                  <FormField
                                    control={form.control}
                                    name="isIndividual"
                                    render={({ field }) => (
                                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                          />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                          <FormDescription>
                                            I&apos;m hiring as an individual
                                          </FormDescription>
                                        </div>
                                      </FormItem>
                                    )}
                                  />
                                </div>
                              ) : (
                                <>
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
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    case 3:
                      return (
                        <div className="mx-auto w-full">
                          <div className="space-y-6">
                            <h1 className="text-left text-2xl font-semibold tracking-tight">
                              What do you do?
                            </h1>
                            {isClient ? (
                              <>
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
                                <InputField
                                  name="role"
                                  control={form.control}
                                  placeholder="Professional title"
                                />
                                <InputField
                                  name="userLocation"
                                  control={form.control}
                                  placeholder="Location"
                                />
                                {/* <InputField
                                  name="link"
                                  control={form.control}
                                  placeholder="Linkedin URL"
                                  startIcon={Link}
                                /> */}

                                <FormField
                                  control={form.control}
                                  name="profilePicture"
                                  render={({ field: { onChange } }) => (
                                    <FormItem className="w-full">
                                      <FormControl>
                                        <ImageUpload
                                          onUpload={(fileUrl: string) =>
                                            onChange(fileUrl)
                                          }
                                          placeholder="Upload profile photo"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </>
                            ) : (
                              <FormField
                                control={form.control}
                                name="tools"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <MultipleSelector
                                        // onSearch={async (value) => {
                                        //   // setIsTriggered(true);
                                        //   const res = await mockSearch(value);
                                        //   // setIsTriggered(false);
                                        //   return res;
                                        // }}
                                        // defaultOptions={skillsOptions}
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
                            )}
                          </div>
                        </div>
                      );
                    case 4:
                      return (
                        <div className="mx-auto w-full">
                          <div className="space-y-6">
                            <h1 className="text-left text-2xl font-semibold tracking-tight">
                              Where are you located?
                            </h1>
                            <div className="flex items-center space-x-4">
                              <InputField
                                name="userLocation"
                                control={form.control}
                                placeholder="Location"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    case 5:
                      return (
                        <div className="mx-auto w-full">
                          <div className="space-y-6">
                            <h1 className="text-left text-2xl font-semibold tracking-tight">
                              Upload profile photo
                            </h1>
                            <div className="flex items-center space-x-4">
                              <FormField
                                control={form.control}
                                name="profilePicture"
                                render={({ field: { onChange } }) => (
                                  <FormItem className="w-full">
                                    <FormControl>
                                      <ImageUpload
                                        onUpload={(fileUrl: string) =>
                                          onChange(fileUrl)
                                        }
                                        placeholder="Upload a photo"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    case 6:
                      return (
                        <div className="mx-auto w-full">
                          <div className="space-y-6">
                            <h1 className="text-left text-2xl font-semibold tracking-tight">
                              Add social links.
                            </h1>
                            <p>
                              Confirm your identity by adding one or more social
                              links.
                            </p>
                            <div className="flex flex-col gap-4">
                              {socialLinks?.map((_, index) => (
                                <InputField
                                  key={index}
                                  name={`socialLinks[${index}]`}
                                  control={form.control}
                                  placeholder="Link"
                                />
                              ))}
                              <div className="">
                                {isValid &&
                                  socialLinks.every(
                                    (link) => link?.trim() !== '',
                                  ) && (
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      className="mt-2 rounded-full"
                                      onClick={() =>
                                        setValue('socialLinks', [
                                          ...socialLinks,
                                          '',
                                        ])
                                      }
                                    >
                                      Add URL
                                    </Button>
                                  )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                  }
                })()}
                {renderContinueButton()}

                <p className="px-8 text-center text-sm">
                  Already have an account?
                  <Link
                    href="/login"
                    className="px-2 text-sm text-blue-600 text-muted-foreground underline underline-offset-4 hover:text-red-500"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
