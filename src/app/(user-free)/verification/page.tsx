'use client';
import HandleResponse from '@/components/common/HandleResponse';
import { buttonVariants } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { SOMETHING_WENT_WRONG, isMyKnownError } from '@/lib/api';
import { removeToken } from '@/lib/cookie';
import useUserInfo from '@/lib/hooks/useUserInfo';
import { cn } from '@/lib/utils';
import {
  useSendEmailMutation,
  useVerifyOtpMutation,
} from '@/redux/api/usersApi';
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp';
import { LoaderIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { TiTick } from 'react-icons/ti';

const Verification = () => {
  const router = useRouter();
  const [value, setValue] = React.useState('');

  const { userInfo, refetch, token } = useUserInfo();
  const [verifyOtp, { data, isSuccess, isLoading, isError, error }] =
    useVerifyOtpMutation();

  const [
    sendEmail,
    {
      data: mailData,
      isLoading: mailLoading,
      isSuccess: isSuccessMail,
      isError: isErrorMail,
      error: errorMail,
    },
  ] = useSendEmailMutation();

  useEffect(() => {
    setValue('');
    if (userInfo?.isVerified) {
      redirect('/dashboard');
    }
  }, [userInfo, data]);

  const onChangeOtp = (otp: string) => {
    setValue(otp);
    if (otp?.length === 6) {
      verifyOtp({ userId: userInfo?._id || '', otp });
    }
  };

  const onSuccess = () => {
    refetch();
  };

  const onError = () => {
    setValue('');
  };

  const sendNewCode = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    sendEmail({
      email: userInfo?.email || '',
      name: userInfo?.firstName || '',
      reqtoken: token,
    });
  };

  const logout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    removeToken();
    router.push('/login');
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
          onSuccess={onSuccess}
          onError={onError}
        />
      )}
      {(isSuccessMail || isErrorMail) && (
        <HandleResponse
          isError={isErrorMail}
          isSuccess={isSuccessMail}
          error={
            isMyKnownError(errorMail)
              ? errorMail.data.message
              : SOMETHING_WENT_WRONG
          }
          message={mailData?.message || ''}
        />
      )}
      <div className="container relative h-screen flex-col items-center justify-center bg-[#fff9fb] bg-gradient-to-r from-fuchsia-50 md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          href="#"
          onClick={logout}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute right-4 top-10 md:right-8 md:top-8',
          )}
        >
          Logout
        </Link>
        <div className="relative flex h-full flex-col py-10 text-primary dark:border-r lg:p-10">
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Image src="/logo.svg" alt="logo" width={191} height={42} />
          </div>
          <div className="m-auto w-[450px] rounded-lg border border-none bg-[#F7EFF1] p-6 text-center text-card-foreground shadow-none lg:py-8">
            <div className="otp flex-col items-center justify-center rounded-[20px] p-5 sm:p-10">
              <h1 className="my-2 font-bold"> We Emailed You A Code </h1>
              <p className="my-2 text-xs">
                Enter The Verification code Sent To :
              </p>
              <p className="my-2 text-xs"> {userInfo?.email}</p>
              <div className="my-2 flex justify-center">
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                  onChange={onChangeOtp}
                  value={value}
                  disabled={isLoading}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <p className="my-2 text-xs">
                Didn&apos;t get code ?{' '}
                <Link href="#" onClick={sendNewCode} className="text-blue-600">
                  Send a new code
                </Link>
              </p>

              <div className="flex items-center justify-center">
                {isLoading || mailLoading ? (
                  <LoaderIcon className="h-6 w-6 animate-spin text-primary/60" />
                ) : (
                  <div className="h-6 w-6" />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto hidden w-full flex-col justify-center space-y-6 sm:w-[500px] lg:flex">
            <div className="bg flex-col items-center justify-center rounded-[20px] border p-5 text-center shadow-md sm:p-10">
              <p className="font-bold">Your Entire Freelance</p>
              <p className="text-md"> Workflow in one place </p>
              <div className="mx-5 text-center">
                <TiTick color="green" className="inline text-center" />
                <span className="text-xs">
                  Get discoverd,find your next job
                </span>{' '}
                <br />
                <TiTick color="green" className="inline text-center" />
                <span className="text-xs">
                  Manage contacts,invoices and so{' '}
                </span>
                <br />
                <span className="mx-5 text-start text-xs">
                  payments,projects
                </span>
                <br />
                <TiTick color="green" className="inline text-center" />
                <span className="text-xs">
                  Get paid 100% commissions free
                </span>{' '}
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Verification;
