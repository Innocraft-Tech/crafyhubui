'use client';
import Image from 'next/image';
import { CardContent } from '../ui/card';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { TypeSignUpSchema, signUpSchema } from '@/data/signUpData';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';

const Signup = () => {
  const form = useForm<TypeSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {},
  });

  const { handleSubmit, reset, control } = form;

  const onSubmit = (data: TypeSignUpSchema) => {
    console.log(data);
    reset(); // Reset the form after submission
  };

  return (
    <>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
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
          CrafyHub
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[500px] ">
          <Form {...form}>
            <form className="space-y-8">
              <div className="flex flex-col space-y-2">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <>
                      <h1 className="text-2xl font-semibold tracking-tight pb-8 text-center">
                        Join as a client or designer
                      </h1>
                      <CardContent className="grid gap-6">
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
                      </CardContent>
                    </>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Signup;
