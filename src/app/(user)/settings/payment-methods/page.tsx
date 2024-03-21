import React from 'react';
import MoneyIcon from '@/assets/money-bag-light.k94uH0zM.webp'
import Image from 'next/image';
const HelpSection: React.FC = () => {
  return (
    <div className="  border h-[350px] rounded-[30px]  w-auto px-5">
      <div className=" grid grid-cols-3 items-center mx-2  my-8">
        <h2 className=" text-md font-medium  mx-3 ">Payment methods</h2>
        <button className="  border-gray-500  border-x-2 border-y-2    rounded-[40px] font-bold text-xs  mx-2 px-1 py-2">
          + Add Finance Integration
        </button>
        <button className=" bg-black text-white rounded-[40px] font-bold px-1 py-2 text-xs">
          + Add Account
        </button>
        <button></button>
      </div>
      <div className="category  my-6 flex justify-center items-center flex-col">
        <Image src={MoneyIcon} alt="money" className=" w-[150px] h-[150px]" />
     <p className=' text-2xl font-medium'> Add a payment method</p>
     <span className=' my-2 text-xs text-gray-500'>Link your preferred credit card or US bank account (ACH)</span>
      </div>
    </div>
  );
};

export default HelpSection;
