'use client';
import React, { SetStateAction, useState } from 'react';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { RiDeleteBin6Fill } from 'react-icons/ri';
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
  setAccountInformation: React.Dispatch<SetStateAction<AccountInformationData>>;

  initialAccountInformation: AccountInformationData;
  editFunc?: any;
}

const AccountInformation: React.FC = () => {
  const [accountInformation, setAccountInformation] =
    useState<AccountInformationData>(initialAccountInformation);
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
    <div className="w-full">
      <div className="mx-4 w-full border">
        <h2 className="mx-4 mt-4 text-2xl font-bold"> Account Information</h2>
        <div className="category mx-5 my-5 w-full">
          <label className="text-md my-2 block font-bold">Email</label>
          <div className="grid w-full grid-cols-2 items-center gap-20">
            {activeEmail ? (
              <EditEmail
                accountInformation={accountInformation}
                setAccountInformation={setAccountInformation}
                initialAccountInformation={initialAccountInformation}
                editFunc={editFunc}
              />
            ) : (
              <>
                <p className="w-full px-2 py-2">{accountInformation.email}</p>
                <HiOutlinePencilSquare
                  className="mx-2 inline h-[25px] w-[25px] cursor-pointer"
                  onClick={() => editFunc('email')}
                />
              </>
            )}
          </div>
        </div>
        <div className="category mx-5 my-5 w-full">
          <label className="text-md my-2 block font-bold">Birthdate</label>
          <div className="grid w-full grid-cols-2 items-center gap-20">
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
                <p className="w-full px-2 py-2 text-sm">
                  {accountInformation.birthdate}
                </p>
                <HiOutlinePencilSquare
                  className="mx-2 inline h-[25px] w-[25px] cursor-pointer"
                  onClick={() => editFunc('birthDate')}
                />
              </>
            )}
          </div>
        </div>
        <div className="category mx-5 my-5 w-full">
          <label className="text-md my-2 block font-bold">Calendar Link</label>
          <div className="grid w-full grid-cols-2 items-center gap-20">
            {activeCalendar ? (
              <EditCalendar
                accountInformation={accountInformation}
                setAccountInformation={setAccountInformation}
                initialAccountInformation={initialAccountInformation}
                editFunc={editFunc}
              />
            ) : (
              <>
                <p className="w-full px-2 py-2">
                  {accountInformation.calendarLink}
                </p>
                <HiOutlinePencilSquare
                  className="mx-2 inline h-[25px] w-[25px] cursor-pointer"
                  onClick={() => editFunc('calendar')}
                />
              </>
            )}
          </div>
        </div>
        <div className="category mx-5 my-5">
          <label className="text-md my-2 block font-bold">Domains</label>
          <span className="my-3 text-sm font-bold">
            crafyHub Profile Domain
          </span>
          <p className="my-3 items-center gap-20 px-2 py-2 text-sm hover:bg-gray-100">
            {accountInformation.profileDomain}
          </p>
        </div>
        <hr className="mx-4 my-5" />
        <div className="mx-5 my-3">
          <span className="text-sm">
            {' '}
            <RiDeleteBin6Fill className="inline h-[20px] w-[20px] text-[#ff0055]" />{' '}
            Delete Account{' '}
          </span>
        </div>
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
          <p className="px-2 py-2">{accountInformation.email}</p>
          <HiOutlinePencilSquare className="mx-2 inline h-[25px] w-[25px] cursor-pointer" />
        </>
      ) : (
        <div className="w-full">
          <input
            type="text"
            name="email"
            placeholder="email"
            value={accountInformation.email}
            className="w-full rounded-md border border-gray-300 p-2 shadow-sm"
            id="email"
            onChange={handleInputChange}
          />
          <div className="grid grid-cols-2 gap-0">
            <button
              className="mx-1 my-2 w-[100px] rounded-[50px] bg-black p-1 text-white"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="mx-1 my-2 w-[100px] rounded-[50px] bg-black p-1 text-white"
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
        <span className="px-2 py-2">{accountInformation.birthdate}</span>
      ) : (
        <div className="grid w-full grid-cols-1">
          <input
            type="date"
            name="birthdate"
            placeholder="birthDate"
            value={accountInformation.birthDate}
            className="w-full rounded-md border border-gray-300 p-2 shadow-sm"
            id="email"
            onChange={handleInputChange}
          />
          <div className="grid grid-cols-2 gap-0">
            <button
              className="mx-1 my-2 w-[100px] rounded-[50px] bg-black p-1 text-white"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="mx-1 my-2 w-[100px] rounded-[50px] bg-black p-1 text-white"
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
        <span className="px-2 py-2">{accountInformation.calendarLink}</span>
      ) : (
        <div className="grid w-full grid-cols-1">
          <input
            type="text"
            name="birthdate"
            placeholder="birthDate"
            value={accountInformation.calendarLink}
            className="w-full rounded-md border border-gray-300 p-2 shadow-sm"
            id="email"
            onChange={handleInputChange}
          />
          <div className="grid grid-cols-2 gap-0">
            <button
              className="mx-1 my-2 w-[100px] rounded-[50px] bg-black p-1 text-white"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="mx-1 my-2 w-[100px] rounded-[50px] bg-black p-1 text-white"
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
