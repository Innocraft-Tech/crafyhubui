'use client';
import React from 'react';
import MoneyIcon from '@/assets/money-bag-light.k94uH0zM.webp';
import Image from 'next/image';
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
import { GoCreditCard } from 'react-icons/go';
import { AiTwotoneBank } from 'react-icons/ai';
const Page: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border h-[350px] rounded-[30px] w-auto px-5">
      <div className="grid grid-cols-3 items-center mx-2 my-8">
        <h2 className="text-md font-medium mx-3">Payment methods</h2>
        <button className="border-gray-500 border-x-2 border-y-2 rounded-[40px] font-bold text-xs mx-2 px-1 py-2">
          + Add Finance Integration
        </button>
        <AlertDialog>
          <AlertDialogTrigger className=" px-2 py-2 bg-black  font-semibold text-white rounded-[40px] text-sm">
            + Add Account
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Add Payment Method</AlertDialogTitle>
              <AlertDialogDescription>
                <div className=" grid grid-cols-2 p-3 cursor-pointer">
                  <div
                    className={
                      ' flex-col  flex justify-center items-center  border-2 border-black rounded-[10px] h-[130px] mx-1 '
                    }
                  >
                    <GoCreditCard className=" text-black w-[30px] h-[30px] block" />
                    <p className=" font-bold text-black my-2 ">
                      Credit / Debit Card
                    </p>
                  </div>

                  <div className="  flex-col flex justify-center items-center h-[130px] rounded-[10px]  border-2 border-black mx-1">
                    <AiTwotoneBank className=" text-black w-[30px] h-[30px] block" />
                    <p className=" font-bold text-black my-2 ">
                      US Bank Account
                    </p>
                  </div>
                </div>
              </AlertDialogDescription>
              <p className=" text-start mx-5 text-xs text-gray-500">
                Pay for work on crafyHub with a Credit or Debit card. Payments
                are processed in seconds and stripe fees can charge from 2% up
                to 5%.
              </p>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className=" px-6 py-2  rounded-[50px]">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction className="  px-6 py-2 rounded-[50px] ">
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className="category my-6 flex justify-center items-center flex-col">
        <Image src={MoneyIcon} alt="money" className="w-[150px] h-[150px]" />
        <p className="text-2xl font-medium">Add a payment method</p>
        <span className="my-2 text-xs text-gray-500">
          Link your preferred credit card or US bank account (ACH)
        </span>
      </div>
    </div>
  );
};

export default Page;
