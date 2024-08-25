'use client';

import { Cloud } from '@/assets';
import HandleResponse from '@/components/common/HandleResponse';
import InputField from '@/components/forms/input-field';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import MultipleSelector from '@/components/ui/multiple-selector';
import { SOMETHING_WENT_WRONG, isMyKnownError } from '@/lib/api';
import useUserInfo from '@/lib/hooks/useUserInfo';
import { useAddSkillMutation, useGetSkillsQuery } from '@/redux/api/authApi';
import { useCreateWorkMutation } from '@/redux/api/workApi';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { ProjectData, projectSchema } from './components/projectData';
export default function Project(): JSX.Element {
  const { data: skillsOptions = [] } = useGetSkillsQuery();
  const [addSkillMutation] = useAddSkillMutation();
  const [createWork, { data: successData = {}, isSuccess, isError, error }] =
    useCreateWorkMutation();
  const { token } = useUserInfo();
  const form = useForm<ProjectData>({
    resolver: zodResolver(projectSchema),
    mode: 'onChange',
    defaultValues: {
      document: '',
      title: '',
      description: '',
      keywords: [],
    },
  });

  const {
    handleSubmit: handleSubmit,
    control: control,
    formState: { errors: errors },
  } = form;
  // const formDataToObject = (formData: FormData) => {
  //   const obj: Record<string, any> = {};
  //   formData.forEach((value, key) => {
  //     obj[key] = value;
  //   });
  //   return obj;
  // };

  const onSubmit = async (data: ProjectData) => {
    try {
      const formData = new FormData();

      if (data.document) formData.append('document', data.document);
      if (data.title) formData.append('title', data.title);
      if (data.description) formData.append('description', data.description);
      if (data.keywords)
        formData.append('keywords', JSON.stringify(data.keywords));

      // Log FormData

      await createWork({ formData, token }).unwrap();
    } catch (error) {
      console.error('Error details:', error);
    }
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
        />
      )}
      <div className="mx-auto mt-6 w-full rounded-md border p-6 sm:w-[50%]">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="container mx-auto p-2"
          >
            <div className="mb-1">
              <Label className="text-sm font-bold">project Title</Label>
              <div className="flex flex-col items-center space-y-2">
                <div className="my-3 flex w-full items-start justify-center gap-3">
                  <InputField
                    name="title"
                    control={control}
                    placeholder="Title"
                  />
                </div>
                {errors.title && (
                  <p className="text-red-500">{errors.title?.message}</p>
                )}
              </div>
            </div>

            <div className="mb-1 w-full">
              <Label className="text-sm font-bold">Keywords</Label>
              <div className="flex w-full flex-col items-center space-y-2">
                <div className="my-3 w-full items-start justify-center">
                  <FormField
                    control={control}
                    name="keywords"
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
                {errors.keywords && (
                  <p className="text-red-500">{errors.keywords?.message}</p>
                )}
              </div>
            </div>
            <div className="mb-1 w-full">
              <Label className="text-sm font-bold">Description</Label>
              <div className="my-3 w-full items-start justify-center">
                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <textarea
                          placeholder="Add Description For Your Project "
                          className="h-[130px] w-full resize-none rounded-xl border p-4"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="mb-1 w-full">
              <Label htmlFor="document" className="text-sm font-bold">
                Upload Cover Photo
              </Label>
              <div className="my-3 w-full items-start justify-center">
                <FormField
                  control={control}
                  name="document"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormControl>
                        <>
                          <div className="flex flex-col items-center justify-center rounded-xl border p-4">
                            <Image
                              src={Cloud}
                              alt="cover"
                              width={50}
                              height={50}
                              className="my-3 flex items-center justify-center"
                            />

                            <Label
                              htmlFor="coverPhoto"
                              className="my-3 flex items-center justify-center text-sm text-gray-400"
                            >
                              Upload Cover Photo
                            </Label>
                            <div className="relative">
                              <input
                                type="file"
                                id="coverPhoto"
                                className="absolute inset-0 h-full cursor-pointer opacity-0"
                                {...field}
                              />
                              <div className="cursor-pointer rounded bg-[#ff0055] px-4 py-2 text-center text-white">
                                Browse
                              </div>
                            </div>
                          </div>

                          {/* <ImageUpload
                            onUpload={(fileUrl: string) => onChange(fileUrl)}
                            placeholder="Upload a photo"
                          ></ImageUpload> */}
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="mt-6 w-full">
              <Button className="w-full">Post </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
