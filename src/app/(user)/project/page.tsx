'use client';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, useForm } from 'react-hook-form';
import { z } from 'zod';
import { projectSchema } from './components/projectData';

export type ProjectSchema = z.infer<typeof projectSchema>;
export default function Project(): JSX.Element {
  const form = useForm<ProjectSchema>({
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
    handleSubmit,
    setValue,
    getValues,
    watch,
    control,
    formState: { errors },
  } = form;

  const onSubmit = async (data: ProjectSchema) => {};
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto p-5">
        <div className="mx-auto w-full rounded-md border p-6 sm:w-[60%]">
          <div className="mb-6">
            <Label className="text-sm font-bold">project Title</Label>
            <FormField
              control={control}
              name="title"
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
        </div>
      </form>
    </Form>
  );
}
