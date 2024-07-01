import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';

const resetPasswordSchema = z.object({
  newPassword: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmNewPassword: z.string().min(6, 'Password must be at least 6 characters long'),
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: "Passwords don't match",
  path: ['confirmNewPassword'],
});

type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;

export const metadata: Metadata = {
  title: 'Forgot Password',
  description: 'Reset your password using this form.',
};

export default function ForgotPasswordPage() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const [resetSuccess, setResetSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit: SubmitHandler<ResetPasswordSchema> = async (data) => {
    try {
      const response = await axios.post(`/api/forgot-password/${token}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data) {
        // Password reset successful
        setResetSuccess(true);
        reset(); // Clear form fields
      } else {
        throw new Error('Failed to reset password');
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        // Handle error (show error message to user)
      } else {
        console.error('An unexpected error occurred');
      }
    }
  };

  return (
    <>
      <div className="container flex flex-col items-center justify-center space-y-6">
        {!resetSuccess ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Reset Password
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your new password below.
              </p>
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="newPassword" className="text-sm font-medium text-muted-foreground">
                New Password
              </label>
              <Input
                type="password"
                id="newPassword"
                {...control('newPassword')}
              />
              {errors.newPassword && (
                <span className="text-xs text-red-500">{errors.newPassword.message}</span>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="confirmNewPassword" className="text-sm font-medium text-muted-foreground">
                Confirm New Password
              </label>
              <Input
                type="password"
                id="confirmNewPassword"
                {...control('confirmNewPassword')}
              />
              {errors.confirmNewPassword && (
                <span className="text-xs text-red-500">{errors.confirmNewPassword.message}</span>
              )}
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              Reset Password
            </button>

            {errorMessage && (
              <div className="text-red-500 text-sm">{errorMessage}</div>
            )}
          </form>
        ) : (
          <div className="flex flex-col space-y-2 text-center">
            <h2 className="text-2xl font-semibold tracking-tight">Password Reset Successful!</h2>
            <p className="text-sm text-muted-foreground">
              You can now <Link href="/signin" className="underline">sign in</Link> with your new password.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
