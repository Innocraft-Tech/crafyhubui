'use client';
import { useGetUserQuery } from '@/redux/api/usersApi';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import {RiDeleteBin6Fill } from "react-icons/ri";
type AccountInformationData = {
  email: string;
  birthdate: string;
  calendarLink: string;
  profileDomain: string;
};

const initialAccountInformation: AccountInformationData = {
  email: 'nagarajthangaraj872@gmail.com',
  birthdate: '24/12/2024',
  calendarLink: 'Cal.com',
  profileDomain: 'contra.com/nagaraj_thangaraj',
};

interface EditEmailProps {
  accountInformation: {
    [x: string]: any;
    email: string;
  };
  setAccountInformation: React.Dispatch<
    React.SetStateAction<{ email: string }>
  >;
  initialAccountInformation: { email: string };
}

const AccountInformation: React.FC = () => {
  const [accountInformation, setAccountInformation] = useState(
    initialAccountInformation,
  );
  const [activeEmail, setActiveEmail] = useState(false);
  const [activeDate, setActiveDate] = useState(false);
  const [activeCalendar, setActiveCalendar] = useState(false);

  function editFunc(type: string) {
    if (type === 'email') {
      setActiveEmail(true);
      setActiveDate(false); // Deactivate birthdate editor
      return false;
    } else if (type === 'birthDate') {
      setActiveEmail(false); // Deactivate email editor
      setActiveDate(true);
    } else if (type === 'calendar') {
      setActiveEmail(false);
      setActiveCalendar(true);
      setActiveDate(false);
    }
  }
  return (
    <div className="border mx-4  w-auto ">
      <h2 className="mx-4 font-bold mt-4 text-2xl"> Account Information</h2>
      <div className="category mx-5 my-5 ">
        <label className="block font-bold text-md my-2">Email</label>
        <div className=" grid grid-cols-2 gap-20 hover:bg-gray-100 items-center   ">
          {activeEmail ? (
            <EditEmail
              accountInformation={accountInformation}
              setAccountInformation={setAccountInformation}
              initialAccountInformation={initialAccountInformation}
              editFunc={editFunc}
            />
          ) : (
            <>
              <p className="px-2 py-2">{accountInformation.email}</p>
              <HiOutlinePencilSquare
                className=" inline w-[25px] h-[25px] mx-2 cursor-pointer  "
                onClick={() => editFunc('email')}
              />
            </>
          )}
        </div>
      </div>
      <div className="category mx-5 my-5">
        <label className="block my-2 font-bold text-md">Birthdate</label>
        <div className=" grid grid-cols-2  gap-20 hover:bg-gray-100 items-center">
          {activeDate ? (
            <>
              <EditDate
                accountInformation={accountInformation}
                setAccountInformation={setAccountInformation}
                initialAccountInformation={initialAccountInformation}
                editFunc={editFunc}
              />
            </>
          ) : (
            <>
              <p className=" px-2 py-2 text-sm">
                {accountInformation.birthdate}
              </p>
              <HiOutlinePencilSquare
                className=" inline w-[25px] h-[25px] mx-2 cursor-pointer "
                onClick={() => editFunc('birthDate')}
              />
            </>
          )}
        </div>
      </div>
      <div className="category mx-5 my-5  ">
        <label className="block my-2 font-bold text-md">Calendar Link</label>
        <div className=" grid grid-cols-2 hover:bg-gray-100 items-center gap-20">
        {activeCalendar ? (
          <EditCalendar
            accountInformation={accountInformation}
            setAccountInformation={setAccountInformation}
            initialAccountInformation={initialAccountInformation}
            editFunc={editFunc}
          />
        ) : (
          <><p className="px-2 py-2">{accountInformation.calendarLink}</p>
          <HiOutlinePencilSquare
                className=" inline w-[25px] h-[25px] mx-2 cursor-pointer "
                onClick={() => editFunc('calendar')}/></>)}
        </div>
      </div>
      <div className="category mx-5 my-5">
        <label className='my-2 font-bold text-md block'>Domains</label>
        <span className=' text-sm font-bold my-3'>Contra Profile Domain</span>
        <p className='px-2 py-2 hover:bg-gray-100 items-center gap-20 my-3 text-sm'>{accountInformation.profileDomain}</p>
      </div>
      <hr className=' mx-4 my-5' />
     <div className=" mx-5 my-3">
     <span className=' '> <RiDeleteBin6Fill className='  bg-pink-50 w-[25px] h-[25px] inline  text-pink-900'/> Delete Account </span>
     </div>
      
    </div>
  );
};
const EditEmail: React.FC<EditEmailProps> = ({
  accountInformation,
  setAccountInformation,
  initialAccountInformation,
}) => {
  const [activeSave, setActiveSave] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountInformation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSave = () => {
    // Perform saving logic here, for now, just log the updated email
    console.log('Saved email:', accountInformation.email);
    setActiveSave(true);
  };

  const handleCancel = () => {
    // Reset the email to its initial value and exit edit mode
    setAccountInformation(initialAccountInformation);
    setActiveSave(true);
  };

  return (
    <>
      {activeSave ? (
        <>
          <p className=" px-2 py-2">{accountInformation.email}</p>
          <HiOutlinePencilSquare className=" inline w-[25px] h-[25px] mx-2 cursor-pointer  " />
        </>
      ) : (
        <div className="">
          <input
            type="text"
            name="email"
            placeholder="email"
            value={accountInformation.email}
            className="w-full
         p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            id="email"
            onChange={handleInputChange}
          />
          <div className=" grid grid-cols-2 gap-0">
            <button
              className=" bg-black  w-[100px] text-white mx-1 my-2 p-1 rounded-[50px]"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className=" bg-black w-[100px]  text-white mx-1 my-2 p-1 rounded-[50px]"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
    </>
    
  );
};
const EditDate: React.FC<EditEmailProps> = ({
  accountInformation,
  setAccountInformation,
  initialAccountInformation,
}) => {
  const [activeSave, setActiveSave] = useState(false);
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountInformation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSave = () => {
    // Perform saving logic here, for now, just log the updated email
    console.log('Saved email:', accountInformation.birthdate);
    setActiveSave(true);
  };
 
  const handleCancel = () => {
    // Reset the email to its initial value and exit edit mode
    setAccountInformation(initialAccountInformation);
    setActiveSave(true);
  };
  return (
    <>
      {activeSave ? (
        <span className=" hover:bg-gray-100 px-2 py-2">
          {accountInformation.birthdate}
        </span>
      ) : (
        <div className=" grid grid-cols-1">
          <input
            type="date"
            name="birthdate"
            placeholder="birthDate"
            value={accountInformation.birthDate}
            className="w-full
         p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            id="email"
            onChange={handleInputChange}
          />
          <div className=" grid grid-cols-2 gap-0">
            <button
              className=" bg-black  w-[100px] text-white mx-1 my-2 p-1 rounded-[50px]"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className=" bg-black w-[100px]  text-white mx-1 my-2 p-1 rounded-[50px]"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};
const EditCalendar: React.FC<EditEmailProps> = ({
  accountInformation,
  setAccountInformation,
  initialAccountInformation,
}) => {
  const [activeSave, setActiveSave] = useState(false);
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountInformation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSave = () => {
    // Perform saving logic here, for now, just log the updated email
    console.log('Saved email:', accountInformation.birthdate);
    setActiveSave(true);
  };
 
  const handleCancel = () => {
    // Reset the email to its initial value and exit edit mode
    setAccountInformation(initialAccountInformation);
    setActiveSave(true);
  };
  return (
    <>
      {activeSave ? (
        <span className=" hover:bg-gray-100 px-2 py-2">
          {accountInformation.calendarLink}
        </span>
      ) : (
        <div className=" grid grid-cols-1">
          <input
            type="text"
            name="birthdate"
            placeholder="birthDate"
            value={accountInformation.calendarLink}
            className="w-full
         p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            id="email"
            onChange={handleInputChange}
          />
          <div className=" grid grid-cols-2 gap-0">
            <button
              className=" bg-black  w-[100px] text-white mx-1 my-2 p-1 rounded-[50px]"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className=" bg-black w-[100px]  text-white mx-1 my-2 p-1 rounded-[50px]"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountInformation;
