'use client';
import { TypeSignUpSchema, signUpSchema } from '@/data/signInData';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useLogInMutation } from '@/redux/api/authApi';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { setToken } from '@/lib/cookie';

const Signin = () => {
  const router = useRouter();
  const [logIn, { isLoading }] = useLogInMutation();

  const form = useForm<TypeSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit, reset, control } = form;

  const onSubmit = async (data: TypeSignUpSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const result = await logIn(data).unwrap();

      // notifySuccess('Login successfully');
      setToken(result.token);
      router.push('/');
      reset();
    } catch (err) {
      // notifyError(data?.error?.data?.error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="text" placeholder="" {...field} />
              </FormControl>
              {/* <FormDescription>
                Email
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="" {...field} />
              </FormControl>
              {/* <FormDescription>
               Password
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default Signin;
