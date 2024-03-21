'use client'
import React, { useState } from 'react';

type AccountInformationData = {
  email: string;
  birthdate: string;
  calendarLink: string;
  profileDomain: string;
};

const initialAccountInformation: AccountInformationData = {
  email: 'nagarajthangaraj872@gmail.com',
  birthdate: '',
  calendarLink: '',
  profileDomain: 'contra.com/nagaraj_thangaraj',
};

const AccountInformation: React.FC = () => {
  const [accountInformation, setAccountInformation] = useState(initialAccountInformation);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setAccountInformation((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="account-information mx-auto max-w-xl">
      <h2 className="text-center text-3xl mt-12 mb-6">Account Information</h2>
      <div className="category">
        <h3 className="text-xl mb-2">Email</h3>
        <input
          type="email"
          name="email"
          value={accountInformation.email}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="category">
        <h3 className="text-xl mb-2">Birthdate</h3>
        <input
          type="text"
          name="birthdate"
          placeholder="MM / YYYY / DD"
          value={accountInformation.birthdate}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="category">
        <h3 className="text-xl mb-2">Calendar Link</h3>
        <input
          type="text"
          name="calendarLink"
          placeholder="e.g. Calendly, zcal, Cal.com"
          value={accountInformation.calendarLink}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="category">
        <h3 className="text-xl mb-2">Contra Profile Domain</h3>
        <p className="text-gray-700">{accountInformation.profileDomain}</p>
      </div>
      <div className="category">
        <h3 className="text-xl mb-2">Delete account</h3>
        <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
          Delete account
        </button>
      </div>
    </div>
  );
};

export default AccountInformation;