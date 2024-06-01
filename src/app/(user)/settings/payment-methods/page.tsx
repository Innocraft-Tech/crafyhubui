'use client';
import MoneyIcon from '@/assets/money-bag-light.k94uH0zM.webp';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import Image from 'next/image';
import React from 'react';
import { AiTwotoneBank } from 'react-icons/ai';
import { GoCreditCard } from 'react-icons/go';
const Page: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="h-[350px] w-auto rounded-[30px] border px-5">
      <div className="mx-2 my-8 grid grid-cols-3 items-center">
        <h2 className="text-md mx-3 font-medium">Payment methods</h2>
        <button className="mx-2 rounded-[40px] border-x-2 border-y-2 border-gray-500 px-1 py-2 text-xs font-bold">
          + Add Finance Integration
        </button>
        <AlertDialog>
          <AlertDialogTrigger className="rounded-[40px] bg-black px-2 py-2 text-sm font-semibold text-white">
            + Add Account
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Add Payment Method</AlertDialogTitle>
              <AlertDialogDescription>
                <div className="grid cursor-pointer grid-cols-2 p-3">
                  <div
                    className={
                      'mx-1 flex h-[130px] flex-col items-center justify-center rounded-[10px] border-2 border-black'
                    }
                  >
                    <GoCreditCard className="block h-[30px] w-[30px] text-black" />
                    <p className="my-2 font-bold text-black">
                      Credit / Debit Card
                    </p>
                  </div>

                  <div className="mx-1 flex h-[130px] flex-col items-center justify-center rounded-[10px] border-2 border-black">
                    <AiTwotoneBank className="block h-[30px] w-[30px] text-black" />
                    <p className="my-2 font-bold text-black">US Bank Account</p>
                  </div>
                </div>
              </AlertDialogDescription>
              <p className="mx-5 text-start text-xs text-gray-500">
                Pay for work on crafyHub with a Credit or Debit card. Payments
                are processed in seconds and stripe fees can charge from 2% up
                to 5%.
              </p>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-[50px] px-6 py-2">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction className="rounded-[50px] px-6 py-2">
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="category my-6 flex flex-col items-center justify-center">
        <Image src={MoneyIcon} alt="money" className="h-[150px] w-[150px]" />
        <p className="text-2xl font-medium">Add a payment method</p>
        <span className="my-2 text-xs text-gray-500">
          Link your preferred credit card or US bank account (ACH)
        </span>
      </div>
    </div>
  );
};

export default Page;
