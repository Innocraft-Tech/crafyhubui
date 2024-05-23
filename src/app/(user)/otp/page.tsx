import React from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import Link from 'next/link';
import { TiTick } from 'react-icons/ti';
const page = () => {
  return (
    <div className=" flex justify-center items-center h-[50%] bg-gradient-to-b from-[rgba(255,0,85,0.07)] to-[rgba(255,255,255,0)] ">
      <div className=" p-5 sm:p-10  container  text-center grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white rounded-[10px]  ">
        <div className="otp p-5 sm:p-10 flex-col  items-center justify-center border rounded-[20px]">
          <h1 className=" my-2 font-bold"> We Emailed You A Code </h1>
          <p className=" my-2 text-xs">Enter The Verification code Sent To :</p>
          <p className=" my-2 text-xs"> nagarajthangaraj872@gmail.com</p>
          <div className=" my-2 flex justify-center">
            {' '}
            <InputOTP maxLength={6}>
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

          <p className=" text-xs my-2">
            Didn&apos;t get code ?{' '}
            <Link href="#" className=" text-blue-600">
              Send a new code
            </Link>
          </p>
        </div>
        <div className="bg  border flex-col items-center justify-center p-5  sm:p-10 shadow-md  rounded-[20px]">
          <p className=" font-bold">Your Entire Freelance</p>
          <p className=" text-md"> Workflow in one place </p>
          <div className=" text-center mx-5">
            <TiTick color="green" className="text-center inline" />
            <span className=" text-xs">
              Get discoverd,find your next job
            </span>{' '}
            <br />
            <TiTick color="green" className="text-center inline" />
            <span className="text-xs">Manage contacts,invoices and so </span>
            <br />
            <span className=" mx-5 text-start text-xs">payments,projects</span>
            <br />
            <TiTick color="green" className="text-center inline" />
            <span className="text-xs">Get paid 100% commissions free</span>{' '}
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
