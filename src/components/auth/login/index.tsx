'use client';
import { TypeSignInSchema, signInSchema } from '@/data/signInData';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '../../ui/form';
import { Button } from '../../ui/button';
import { useLogInMutation } from '@/redux/api/authApi';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { setToken } from '@/lib/cookie';
import EmailPasswordFormField from '@/components/forms/email-password-form';

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
      </form>
    </Form>
  );
};

export default SigninForm;
