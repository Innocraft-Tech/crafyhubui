'use client';
import { TypeSignInSchema, signInSchema } from '@/data/signInData';
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
} from '../../ui/form';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { useLogInMutation } from '@/redux/api/authApi';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { setToken } from '@/lib/cookie';
import EmailPasswordFormField from '@/components/forms/email-password-form';
import Link from 'next/link';
const SigninForm = () => {
  const router = useRouter();
  const [logIn, { isLoading }] = useLogInMutation();

  const form = useForm<TypeSignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit, reset, control } = form;

  const onSubmit = async (data: TypeSignInSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const result = await logIn(data).unwrap();

      console.log(result);
      // // notifySuccess('Login successfully');
      setToken(result.token);
      router.push('/dashboard');
      reset();
    } catch (err) {
      // notifyError(data?.error?.data?.error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <EmailPasswordFormField control={control} />

        <Button disabled={isLoading} type="submit">
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit
        </Button>
        <div className="flex justify-end">
          <Link href="/forgotpassword">
            <a className="text-sm text-blue-500 hover:underline">Forgot Password?</a>
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default SigninForm;
