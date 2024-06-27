'use client';
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
import ImageUpload from '@/components/ui/image-upload';
import { Label } from '@/components/ui/label';
import MultipleSelector from '@/components/ui/multiple-selector';
import { SOMETHING_WENT_WRONG, isMyKnownError } from '@/lib/api';
import useUserInfo from '@/lib/hooks/useUserInfo';
import { useAddSkillMutation, useGetSkillsQuery } from '@/redux/api/authApi';
import { useCreateWorkMutation } from '@/redux/api/workApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ProjectData, projectSchema } from './components/projectData';

export default function Project(): JSX.Element {
  const [loading, setLoading] = useState(false);
  const [selectedImagePath, setSelectedImagePath] = useState<string | null>();
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const { data: skillsOptions = [] } = useGetSkillsQuery();
  const [addSkillMutation] = useAddSkillMutation();
  const [
    createWork,
    { data: successData = {}, isLoading, isSuccess, isError, error },
  ] = useCreateWorkMutation();
  const { token } = useUserInfo();
  const form = useForm<ProjectData>({
    resolver: zodResolver(projectSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      keywords: [],
      description: '',
      document: '',
    },
  });

  const {
    handleSubmit: handleSubmit,
    control: control,
    formState: { errors: errors },
  } = form;
  const onSubmit = async (data: ProjectData) => {
    createWork({ data, token: token });
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
            onSubmit={() => handleSubmit(onSubmit)}
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
                  render={({ field: { onChange } }) => (
                    <FormItem className="">
                      <FormControl>
                        <>
                          {/* <Image
                              src={Cloud}
                              alt="cover"
                              width={50}
                              height={50}
                              className="my-3 flex items-center justify-center"
                            /> */}
                          {/* <p className='"my-3 flex items-center justify-center text-sm text-gray-400'>
                              Upload File{' '}
                            </p> */}

                          {/* <input
                              type="file"
                              accept="image/*"
                              id="file-upload"
                              placeholder="Provide a detailed description of the job"
                              className="hidden"
                              {...field}
                            /> */}
                          <ImageUpload
                            onUpload={(fileUrl: string) => onChange(fileUrl)}
                            placeholder="Upload a photo"
                          ></ImageUpload>
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
