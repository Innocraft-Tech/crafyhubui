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
      label: 'Email me with Contra updates and promotions',
      isChecked: false,
    },
  ],
  support: [
    {
      id: 'support-requests',
      label:
        'Include emails sent directly from hello@contra.com in response to support requests',
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
        'Keep in touch with the latest Contra news, including new features and upcoming events.',
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
      <div className=" border">
        <h2 className="text-start mx-10 text-2xl font-bold mt-12 mb-6 ">
          Email Preferences
        </h2>
        <div className="email-preferences mx-auto max-w-xl grid grid-cols-2 ">
          <div className="category  mx-2 my-2">
            {formData.marketing.map((option) => (
              <div key={option.id} className="   mb-2">
                <input
                  id={option.id}
                  type="checkbox"
                  checked={option.isChecked}
                  onChange={() => handleCheckboxChange('marketing', option.id)}
                  className="form-checkbox h-5 w-5  relative top-1 text-indigo-600 mr-2"
                 
                />
                <h3 className="text-md font-bold inline ">Marketing</h3>
                <label
                  htmlFor={option.id}
                  className="text-gray-400  my-2 block   "
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          <div className="category  mx-2 my-2">
            {formData.support.map((option) => (
              <div key={option.id} className=" mb-2">
                <input
                  id={option.id}
                  type="checkbox"
                  checked={option.isChecked}
                  onChange={() => handleCheckboxChange('support', option.id)}
                  className="form-checkbox h-5 w-5 relative top-1 mr-2"
                />
                <h3 className="text-md  font-bold inline">Support</h3>
                <label htmlFor={option.id} className="text-gray-400 my-2 block">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          <div className="category  mx-2 my-2">
            {formData.suggestion.map((option) => (
              <div key={option.id} className=" mb-2">
                <input
                  id={option.id}
                  type="checkbox"
                  checked={option.isChecked}
                  onChange={() =>
                    handleCheckboxChange('suggestion', option.id)
                  }
                  className="form-checkbox h-5 w-5 text-indigo-600 mr-2 relative top-1"
                />
                <h3 className="text-md font-bold inline">
                  Profile Suggestions
                </h3>
                <label
                  htmlFor={option.id}
                  className="  text-gray-400 my-2 block"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          <div className="category   mx-2 my-2">
            {formData.newsletter.map((option) => (
              <div key={option.id} className=" mb-2">
                <input
                  id={option.id}
                  type="checkbox"
                  checked={option.isChecked}
                  onChange={() => handleCheckboxChange('newsletter', option.id)}
                  className="form-checkbox  relative top-1 h-5 w-5 text-indigo-600 mr-2"
                />
                <h3 className="text-md  font-bold   inline">Newsletter</h3>
                <label htmlFor={option.id} className="text-gray-400 my-2 block">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        <hr className=" mx-5  " />
        <div className="flex justify-start mx-5 px-5 py-5 ">
          <div className=" px-5 py-5">
            <span className=" text-gray-500 block">
              Or check here to turn off all emails:
            </span>
            <input
              type="checkbox"
              name=""
              id=""
              className=" w-[20px] h-[20px] relative top-1  mt-3 mx-2"
            />
            <span className=" mb-2 text-md font-bold">
              Unsubscribe from all emails
            </span>
            <button
              type="button" 
              disabled={isButtonDisabled}
              className=" w-[60%] text-md font-bold cursor-pointer bg-black text-white px-3 py-2 rounded-[50px] my-5"
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
