'use client';

import InputField from '@/components/forms/input-field';
import { Label } from '@/components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, useForm } from 'react-hook-form';
import { ProjectTile, projectTileSchema } from './components/projectData';
export default function Project(): JSX.Element {
  const titleForm = useForm<ProjectTile>({
    resolver: zodResolver(projectTileSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
    },
  });
  const {
    handleSubmit: handleTileSubmit,
    control: titleControl,
    formState: { errors: titleErrors },
  } = titleForm;

  return (
    <Form {...titleForm}>
      <form onSubmit={() => handleTileSubmit} className="container mx-auto p-5">
        <div className="mx-auto w-full rounded-md border p-6 sm:w-[60%]">
          <div className="mb-6">
            <Label className="text-sm font-bold">project Title</Label>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-start justify-center gap-3">
                <InputField
                  name="title"
                  control={titleControl}
                  placeholder="Title"
                />
              </div>
              {titleErrors.title && (
                <p className="text-red-500">{titleErrors.title.message}</p>
              )}
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
