'use client';
import React, { useState } from 'react';

type CheckboxOption = {
  id: string;
  label: string;
  isChecked: boolean;
};

type FormData = {
  marketing: CheckboxOption[];
  support: CheckboxOption[];
  suggestion: CheckboxOption[];
  newsletter: CheckboxOption[];
};

const initialFormData: FormData = {
  marketing: [
    {
      id: 'marketing-updates',
      label: 'Email me with CrafyHub updates and promotions',
      isChecked: false,
    },
  ],
  support: [
    {
      id: 'support-requests',
      label:
        'Include emails sent directly from hello@crafyhub.com in response to support requests',
      isChecked: false,
    },
  ],
  suggestion: [
    {
      id: 'profile-suggestions',
      label:
        'Send suggestions to improve my profile or share other tips based on successful or high-performing profiles that are similar to mine.',
      isChecked: false,
    },
  ],
  newsletter: [
    {
      id: 'contra-news',
      label:
        'Keep in touch with the latest CrafyHub news, including new features and upcoming events.',
      isChecked: false,
    },
  ],
};

const EmailPreferences: React.FC = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const handleCheckboxChange = (category: keyof FormData, id: string) => {
    setFormData((prevData) => {
      // Check if prevData[category] is defined, if not, return an empty array
      const updatedCategory = (prevData[category] || []).map((option) =>
        option.id === id ? { ...option, isChecked: !option.isChecked } : option,
      );

      return {
        ...prevData,
        [category]: updatedCategory,
      };
    });
  };

  return (
    <>
      <div className="border">
        <h2 className="mx-10 mb-6 mt-12 text-start text-2xl font-bold">
          Email Preferences
        </h2>
        <div className="email-preferences mx-auto grid max-w-xl grid-cols-2">
          <div className="category mx-2 my-2">
            {formData.marketing.map((option) => (
              <div key={option.id} className="mb-2">
                <input
                  id={option.id}
                  type="checkbox"
                  checked={option.isChecked}
                  onChange={() => handleCheckboxChange('marketing', option.id)}
                  className="form-checkbox relative top-1 mr-2 h-5 w-5 text-indigo-600"
                />
                <h3 className="text-md inline font-bold">Marketing</h3>
                <label htmlFor={option.id} className="my-2 block text-gray-400">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          <div className="category mx-2 my-2">
            {formData.support.map((option) => (
              <div key={option.id} className="mb-2">
                <input
                  id={option.id}
                  type="checkbox"
                  checked={option.isChecked}
                  onChange={() => handleCheckboxChange('support', option.id)}
                  className="form-checkbox relative top-1 mr-2 h-5 w-5"
                />
                <h3 className="text-md inline font-bold">Support</h3>
                <label htmlFor={option.id} className="my-2 block text-gray-400">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          <div className="category mx-2 my-2">
            {formData.suggestion.map((option) => (
              <div key={option.id} className="mb-2">
                <input
                  id={option.id}
                  type="checkbox"
                  checked={option.isChecked}
                  onChange={() => handleCheckboxChange('suggestion', option.id)}
                  className="form-checkbox relative top-1 mr-2 h-5 w-5 text-indigo-600"
                />
                <h3 className="text-md inline font-bold">
                  Profile Suggestions
                </h3>
                <label htmlFor={option.id} className="my-2 block text-gray-400">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          <div className="category mx-2 my-2">
            {formData.newsletter.map((option) => (
              <div key={option.id} className="mb-2">
                <input
                  id={option.id}
                  type="checkbox"
                  checked={option.isChecked}
                  onChange={() => handleCheckboxChange('newsletter', option.id)}
                  className="form-checkbox relative top-1 mr-2 h-5 w-5 text-indigo-600"
                />
                <h3 className="text-md inline font-bold">Newsletter</h3>
                <label htmlFor={option.id} className="my-2 block text-gray-400">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        <hr className="mx-5" />
        <div className="mx-5 flex justify-start px-5 py-5">
          <div className="px-5 py-5">
            <span className="block text-gray-500">
              Or check here to turn off all emails:
            </span>
            <input
              type="checkbox"
              name=""
              id=""
              className="relative top-1 mx-2 mt-3 h-[20px] w-[20px]"
            />
            <span className="text-md mb-2 font-bold">
              Unsubscribe from all emails
            </span>
            <button
              type="button"
              disabled={isButtonDisabled}
              className="text-md my-5 w-[60%] cursor-pointer rounded-[50px] bg-black px-3 py-2 font-bold text-white"
            >
              {' '}
              Update Email Prefrence
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailPreferences;
