'use client';

import HandleResponse from '@/components/common/HandleResponse';
import InputField from '@/components/forms/input-field';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import MultipleSelector from '@/components/ui/multiple-selector';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SOMETHING_WENT_WRONG, isMyKnownError } from '@/lib/api';
import { getAccessToken } from '@/lib/cookie';
import useUserInfo from '@/lib/hooks/useUserInfo';
import { useAddSkillMutation, useGetSkillsQuery } from '@/redux/api/authApi';
import { useUpdateProfileMutation } from '@/redux/api/usersApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ProfileImageUpload from './profileImageUpload';
import {
  BioInfo,
  RateInfo,
  SkillInfo,
  TimezoneInfo,
  UserInfo,
  bioSchema,
  rateSchema,
  skillSchema,
  timezoneSchema,
  userInfoSchema,
} from './profileSchema';

const getDataPayload = (userInfo: User | undefined) => {
  return {
    firstName: userInfo?.firstName || '',
    lastName: userInfo?.lastName || '',
    perHourValue: userInfo?.perHourValue || [],
    profilePicture: userInfo?.profilePicture || '',
    tools: userInfo?.tools || [],
    bio: userInfo?.bio || '',
    timezone: userInfo?.timezone || '',
  };
};

const convertRateToString = (rate: [number, number] | number[]): string => {
  if (rate.length === 0) return 'I’d prefer not to say';
  return `$${rate[0]} - $${rate[1]}/hr`;
};

const convertStringToRate = (value: string): [number, number] | [] => {
  if (!value || value === 'I’d prefer not to say') return [];
  const parsed = JSON.parse(value);
  return parsed;
};

export default function ProfileLeftSection(): JSX.Element {
  const token = getAccessToken();
  const { userInfo } = useUserInfo();
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingRate, setIsEditingRate] = useState(false);
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingTimezone, setIsEditingTimezone] = useState(false);

  const { data: skillsOptions = [] } = useGetSkillsQuery();
  const [addSkillMutation] = useAddSkillMutation();
  const [updateProfile, { error, isError, isSuccess, data }] =
    useUpdateProfileMutation();

  const nameForm = useForm<UserInfo>({
    resolver: zodResolver(userInfoSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: userInfo?.firstName || '',
      lastName: userInfo?.lastName || '',
    },
  });

  const rateForm = useForm<RateInfo>({
    resolver: zodResolver(rateSchema),
    mode: 'onChange',
    defaultValues: {
      perHourValue: userInfo?.perHourValue || [],
    },
  });

  const skillsForm = useForm<SkillInfo>({
    resolver: zodResolver(skillSchema),
    mode: 'onChange',
    defaultValues: {
      tools: userInfo?.tools || [],
    },
  });

  const bioForm = useForm<BioInfo>({
    resolver: zodResolver(bioSchema),
    mode: 'onChange',
    defaultValues: {
      bio: userInfo?.bio || '',
    },
  });

  const timezoneForm = useForm<TimezoneInfo>({
    resolver: zodResolver(timezoneSchema),
    mode: 'onChange',
    defaultValues: {
      timezone: userInfo?.timezone || '',
    },
  });

  const {
    reset: resetNameForm,
    handleSubmit: handleNameSubmit,
    control: nameControl,
    formState: { errors: nameErrors },
  } = nameForm;
  const {
    reset: resetRateForm,
    handleSubmit: handleRateSubmit,
    control: rateControl,
    formState: { errors: rateErrors },
  } = rateForm;
  const {
    reset: resetSkillsForm,
    handleSubmit: handleSkillsSubmit,
    control: skillsControl,
    formState: { errors: skillsErrors },
  } = skillsForm;
  const {
    reset: resetBioForm,
    handleSubmit: handleBioSubmit,
    control: bioControl,
    formState: { errors: bioErrors },
  } = bioForm;
  const {
    reset: resetTimezoneForm,
    handleSubmit: handleTimezoneSubmit,
    control: timezoneControl,
    formState: { errors: timezoneErrors },
  } = timezoneForm;

  useEffect(() => {
    if (userInfo) {
      resetNameForm({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
      });
      resetRateForm({
        perHourValue: userInfo.perHourValue || [],
      });
      resetSkillsForm({
        tools: userInfo.tools,
      });
      resetBioForm({
        bio: userInfo.bio,
      });
      resetTimezoneForm({
        timezone: userInfo.timezone,
      });
    }
  }, [
    userInfo,
    resetNameForm,
    resetRateForm,
    resetSkillsForm,
    resetBioForm,
    resetTimezoneForm,
  ]);

  const handleEditNameClick = () => {
    setIsEditingName(true);
  };

  const handleEditRateClick = () => {
    setIsEditingRate(true);
  };

  const handleEditSkillsClick = () => {
    setIsEditingSkills(true);
  };

  const handleEditBioClick = () => {
    setIsEditingBio(true);
  };

  const handleEditTimezoneClick = () => {
    setIsEditingTimezone(true);
  };

  const handleSaveNameClick: SubmitHandler<UserInfo> = (data) => {
    setIsEditingName(false);
    const payload = {
      ...getDataPayload(userInfo),
      ...data,
    };

    updateProfile({ data: payload, id: token || '' });
    setIsEditingName(false);
  };

  const handleSaveRateClick: SubmitHandler<RateInfo> = (data) => {
    setIsEditingRate(false);

    const payload = {
      ...getDataPayload(userInfo),
      ...data,
    };
    updateProfile({ data: payload, id: token || '' });
    setIsEditingRate(false);
  };

  const handleSaveSkillsClick: SubmitHandler<SkillInfo> = (data) => {
    setIsEditingSkills(false);

    const payload = {
      ...getDataPayload(userInfo),
      ...data,
    };
    updateProfile({ data: payload, id: token || '' });
    setIsEditingSkills(false);
  };

  const handleSaveBioClick: SubmitHandler<BioInfo> = (data) => {
    setIsEditingBio(false);

    const payload = {
      ...getDataPayload(userInfo),
      ...data,
    };
    updateProfile({ data: payload, id: token || '' });

    setIsEditingBio(false);
  };

  const handleSaveTimezoneClick: SubmitHandler<TimezoneInfo> = (data) => {
    setIsEditingTimezone(false);

    const payload = {
      ...getDataPayload(userInfo),
      ...data,
    };
    updateProfile({ data: payload, id: token || '' });
    // console.log(data);
    setIsEditingTimezone(false);
  };

  const onUploadProfile = (url: string) => {
    const payload = {
      ...getDataPayload(userInfo),
      profilePicture: url,
    };
    updateProfile({ data: payload, id: token || '' });
  };

  const handleCancelNameClick = () => {
    setIsEditingName(false);
    resetNameForm();
  };

  const handleCancelRateClick = () => {
    setIsEditingRate(false);
    resetRateForm();
  };

  const handleCancelSkillsClick = () => {
    setIsEditingSkills(false);
    resetSkillsForm();
  };

  const handleCancelBioClick = () => {
    setIsEditingBio(false);
    resetBioForm();
  };

  const handleCancelTimezoneClick = () => {
    setIsEditingTimezone(false);
    resetTimezoneForm();
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
          message={data?.message || ''}
          onSuccess={() => {}}
        />
      )}

      <Card className="shadow-none">
        <CardHeader className="flex flex-col items-center">
          <ProfileImageUpload
            img={userInfo?.profilePicture}
            onUploadProfile={onUploadProfile}
          />
          {/* <span className="text-purple-500">INCOMPLETE</span> */}
          {userInfo?.profileIsComplete ? (
            <span className="text-md mt-2 rounded-full bg-green-100 px-2 py-0.5 text-sm text-green-900">
              COMPLETE
            </span>
          ) : (
            <span className="mt-2 rounded-full bg-pink-100 px-2 py-0.5 text-sm text-pink-800">
              INCOMPLETE
            </span>
          )}
        </CardHeader>
        <CardContent>
          {isEditingName ? (
            <Form {...nameForm}>
              <form
                onSubmit={handleNameSubmit(handleSaveNameClick)}
                className="space-y-4"
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex items-start justify-center gap-3">
                    <InputField
                      name="firstName"
                      control={nameControl}
                      placeholder="First Name"
                    />
                    <InputField
                      name="lastName"
                      control={nameControl}
                      placeholder="Last Name"
                    />
                  </div>
                  {nameErrors.firstName && (
                    <p className="text-red-500">
                      {nameErrors.firstName.message}
                    </p>
                  )}

                  {nameErrors.lastName && (
                    <p className="text-red-500">
                      {nameErrors.lastName.message}
                    </p>
                  )}
                </div>
                <div className="mt-2 flex items-end justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancelNameClick}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="default">
                    Save
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <>
              <div
                className="relative flex cursor-pointer flex-col items-center p-2 hover:bg-accent/30 hover:text-accent-foreground"
                onClick={handleEditNameClick}
              >
                <div className="group">
                  <h1 className="text-2xl font-bold">{`${userInfo?.firstName} ${userInfo?.lastName}`}</h1>

                  <button className="absolute right-0 top-1/2 -translate-y-1/2 transform opacity-0 transition-opacity group-hover:opacity-100">
                    <svg
                      className="h-4 w-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536M4 13.5v6h6l11.243-11.243a1.5 1.5 0 00-2.121-2.121L4 13.5z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}

          <Button variant="default" className="my-4 w-full rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="mr-3"
              fill="#fff"
              viewBox="0 0 256 256"
            >
              <path d="M225.88,30.12a13.83,13.83,0,0,0-13.7-3.58l-.11,0L20.14,84.77A14,14,0,0,0,18,110.88l85.61,40.55a2.08,2.08,0,0,1,.95.95L145.12,238a13.87,13.87,0,0,0,12.61,8c.4,0,.81,0,1.21-.05a13.9,13.9,0,0,0,12.29-10.09l58.2-191.93,0-.11A13.83,13.83,0,0,0,225.88,30.12Zm-8,10.4L159.73,232.43l0,.11a1.88,1.88,0,0,1-1.76,1.45,1.86,1.86,0,0,1-2-1.14l-40-84.36,48.24-48.24a6,6,0,1,0-8.49-8.49L107.52,140,23.15,100a2,2,0,0,1,.31-3.74l.11,0L215.48,38.08a1.94,1.94,0,0,1,1.92.52A2,2,0,0,1,217.92,40.52Z"></path>
            </svg>
            Get In Touch
          </Button>

          <h2 className="my-2 text-xs text-gray-500">RATE</h2>
          {isEditingRate ? (
            <Form {...rateForm}>
              <form
                onSubmit={handleRateSubmit(handleSaveRateClick)}
                className="my-2 space-y-4"
              >
                <div className="space-y-2">
                  <FormField
                    control={rateControl}
                    name="perHourValue"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(convertStringToRate(value));
                            }}
                            value={`[${field.value}]`}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="I'd prefer not to say" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="[0,0]">
                                I&apos;d prefer not to say
                              </SelectItem>
                              <SelectItem value="[25,50]">
                                $25 - $50/hr
                              </SelectItem>
                              <SelectItem value="[50,75]">
                                $50 - $75/hr
                              </SelectItem>
                              <SelectItem value="[75,100]">
                                $75 - $100/hr
                              </SelectItem>
                              <SelectItem value="[100,150]">
                                $100 - $150/hr
                              </SelectItem>
                              <SelectItem value="[150,200]">
                                $150 - $200/hr
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
                {rateErrors.perHourValue && (
                  <p className="text-red-500">
                    {rateErrors.perHourValue.message}
                  </p>
                )}
                <div className="mt-2 flex items-end justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancelRateClick}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="default">
                    Save
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <>
              <div
                className="relative flex cursor-pointer flex-col p-2 hover:bg-accent/30 hover:text-accent-foreground"
                onClick={handleEditRateClick}
              >
                <div className="group">
                  <p className="text-sm">
                    {userInfo?.perHourValue?.length &&
                    userInfo.perHourValue[0] ? (
                      <Badge
                        className="px-2 py-1 text-muted-foreground"
                        variant={'secondary'}
                      >
                        {convertRateToString(userInfo.perHourValue)}
                      </Badge>
                    ) : (
                      'I’d prefer not to say'
                    )}
                  </p>
                  <button className="absolute right-0 top-1/2 -translate-y-1/2 transform opacity-0 transition-opacity group-hover:opacity-100">
                    <svg
                      className="h-4 w-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536M4 13.5v6h6l11.243-11.243a1.5 1.5 0 00-2.121-2.121L4 13.5z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}
          <h2 className="my-2 text-xs text-gray-500">SKILLS</h2>
          {isEditingSkills ? (
            <Form {...skillsForm}>
              <form
                onSubmit={handleSkillsSubmit(handleSaveSkillsClick)}
                className="my-2 space-y-4"
              >
                <div className="flex flex-col items-center space-y-2">
                  <FormField
                    control={skillsControl}
                    name="tools"
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
                {skillsErrors.tools && (
                  <p className="text-red-500">{skillsErrors.tools.message}</p>
                )}
                <div className="mt-2 flex items-end justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancelSkillsClick}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="default">
                    Save
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <>
              <div
                className="relative flex cursor-pointer flex-col p-2 hover:bg-accent/30 hover:text-accent-foreground"
                onClick={handleEditSkillsClick}
              >
                <div className="group">
                  <p className="flex flex-wrap gap-2 text-sm">
                    {userInfo?.tools?.length
                      ? userInfo.tools.map((tool) => (
                          <Badge
                            className="px-2 py-1"
                            variant={'outline'}
                            key={tool}
                          >
                            {tool}
                          </Badge>
                        ))
                      : 'No tools specified'}
                  </p>
                  <button className="absolute right-0 top-1/2 -translate-y-1/2 transform opacity-0 transition-opacity group-hover:opacity-100">
                    <svg
                      className="h-4 w-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536M4 13.5v6h6l11.243-11.243a1.5 1.5 0 00-2.121-2.121L4 13.5z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}
          <h2 className="my-2 text-xs text-gray-500">ABOUT</h2>
          {isEditingBio ? (
            <Form {...bioForm}>
              <form
                onSubmit={handleBioSubmit(handleSaveBioClick)}
                className="my-2 space-y-4"
              >
                <div className="space-y-2">
                  <InputField
                    name="bio"
                    control={bioControl}
                    placeholder="Add a descriptive bio"
                  />
                  {bioErrors.bio && (
                    <p className="text-red-500">{bioErrors.bio.message}</p>
                  )}
                </div>
                <div className="mt-2 flex items-end justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancelBioClick}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="default">
                    Save
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <>
              <div
                className="relative flex cursor-pointer flex-col p-2 hover:bg-accent/30 hover:text-accent-foreground"
                onClick={handleEditBioClick}
              >
                <div className="group">
                  <p className="text-sm">{userInfo?.bio || 'Add bio'}</p>
                  <button className="absolute right-0 top-1/2 -translate-y-1/2 transform opacity-0 transition-opacity group-hover:opacity-100">
                    <svg
                      className="h-4 w-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536M4 13.5v6h6l11.243-11.243a1.5 1.5 0 00-2.121-2.121L4 13.5z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}
          <h2 className="my-2 text-xs text-gray-500">TIMEZONE</h2>
          {isEditingTimezone ? (
            <Form {...timezoneForm}>
              <form
                onSubmit={handleTimezoneSubmit(handleSaveTimezoneClick)}
                className="my-2 space-y-4"
              >
                <div className="space-y-2">
                  <FormField
                    control={timezoneControl}
                    name="timezone"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>North America</SelectLabel>
                              <SelectItem value=" Eastern Standard Time (EST)">
                                Eastern Standard Time (EST)
                              </SelectItem>
                              <SelectItem value="Central Standard Time (CST)">
                                Central Standard Time (CST)
                              </SelectItem>
                              <SelectItem value="Mountain Standard Time (MST)">
                                Mountain Standard Time (MST)
                              </SelectItem>
                              <SelectItem value="Pacific Standard Time (PST)">
                                Pacific Standard Time (PST)
                              </SelectItem>
                              <SelectItem value="Alaska Standard Time (AKST)">
                                Alaska Standard Time (AKST)
                              </SelectItem>
                              <SelectItem value="Hawaii Standard Time (HST)">
                                Hawaii Standard Time (HST)
                              </SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                              <SelectLabel>Europe & Africa</SelectLabel>
                              <SelectItem value="Greenwich Mean Time (GMT)">
                                Greenwich Mean Time (GMT)
                              </SelectItem>
                              <SelectItem value="Central European Time (CET)">
                                Central European Time (CET)
                              </SelectItem>
                              <SelectItem value="Eastern European Time (EET)">
                                Eastern European Time (EET)
                              </SelectItem>
                              <SelectItem value="Western European Summer Time (WEST)">
                                Western European Summer Time (WEST)
                              </SelectItem>
                              <SelectItem value="Central Africa Time (CAT)">
                                Central Africa Time (CAT)
                              </SelectItem>
                              <SelectItem value="East Africa Time (EAT)">
                                East Africa Time (EAT)
                              </SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                              <SelectLabel>Asia</SelectLabel>
                              <SelectItem value="Moscow Time (MSK)">
                                Moscow Time (MSK)
                              </SelectItem>
                              <SelectItem value="India Standard Time (IST)">
                                India Standard Time (IST)
                              </SelectItem>
                              <SelectItem value="China Standard Time (CST)">
                                China Standard Time (CST)
                              </SelectItem>
                              <SelectItem value="Japan Standard Time (JST)">
                                Japan Standard Time (JST)
                              </SelectItem>
                              <SelectItem value="Korea Standard Time (KST)">
                                Korea Standard Time (KST)
                              </SelectItem>
                              <SelectItem value="Indonesia Central Standard Time (WITA)">
                                Indonesia Central Standard Time (WITA)
                              </SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                              <SelectLabel>Australia & Pacific</SelectLabel>
                              <SelectItem value="Australian Western Standard Time (AWST)">
                                Australian Western Standard Time (AWST)
                              </SelectItem>
                              <SelectItem value="Australian Central Standard Time (ACST)">
                                Australian Central Standard Time (ACST)
                              </SelectItem>
                              <SelectItem value="Australian Eastern Standard Time (AEST)">
                                Australian Eastern Standard Time (AEST)
                              </SelectItem>
                              <SelectItem value="New Zealand Standard Time (NZST)">
                                New Zealand Standard Time (NZST)
                              </SelectItem>
                              <SelectItem value="Fiji Time (FJT)">
                                Fiji Time (FJT)
                              </SelectItem>
                            </SelectGroup>
                            <SelectGroup>
                              <SelectLabel>South America</SelectLabel>
                              <SelectItem value="Argentina Time (ART)">
                                Argentina Time (ART)
                              </SelectItem>
                              <SelectItem value="Bolivia Time (BOT)">
                                Bolivia Time (BOT)
                              </SelectItem>
                              <SelectItem value="Brasilia Time (BRT)">
                                Brasilia Time (BRT)
                              </SelectItem>
                              <SelectItem value="Chile Standard Time (CLT)">
                                Chile Standard Time (CLT)
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {timezoneErrors.timezone && (
                  <p className="text-red-500">
                    {timezoneErrors.timezone.message}
                  </p>
                )}
                <div className="mt-2 flex items-end justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancelTimezoneClick}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="default">
                    Save
                  </Button>
                </div>
              </form>
            </Form>
          ) : (
            <>
              <div
                className="relative flex cursor-pointer flex-col p-2 hover:bg-accent/30 hover:text-accent-foreground"
                onClick={handleEditTimezoneClick}
              >
                <div className="group">
                  <p className="text-sm">
                    {userInfo?.timezone || 'Add timezone'}
                  </p>
                  <button className="absolute right-0 top-1/2 -translate-y-1/2 transform opacity-0 transition-opacity group-hover:opacity-100">
                    <svg
                      className="h-4 w-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536M4 13.5v6h6l11.243-11.243a1.5 1.5 0 00-2.121-2.121L4 13.5z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
}
