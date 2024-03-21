'use client'
import React, { useState } from 'react';

type CheckboxOption = {
  id: string;
  label: string;
  isChecked: boolean;
};

type FormData = {
  marketing: CheckboxOption[];
  support: CheckboxOption[];
  newsletter: CheckboxOption[];
};

const initialFormData: FormData = {
  marketing: [
    { id: 'marketing-updates', label: 'Email me with Contra updates and promotions', isChecked: false },
    { id: 'profile-suggestions', label: 'Profile Suggestions', isChecked: false },
  ],
  support: [
    { id: 'support-requests', label: 'Support', isChecked: false },
  ],
  newsletter: [
    { id: 'contra-news', label: 'Newsletter', isChecked: false },
  ],
};

const EmailPreferences: React.FC = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleCheckboxChange = (category: keyof FormData, id: string) => {
    setFormData((prevData) => {
      const updatedCategory = prevData[category].map((option) =>
        option.id === id ? { ...option, isChecked: !option.isChecked } : option
      );

      return {
        ...prevData,
        [category]: updatedCategory,
      };
    });
  };

  return (
    <div className="email-preferences mx-auto max-w-xl">
    <h2 className="text-center text-3xl mt-12 mb-6">Email Preferences</h2>
    <div className="category">
      <h3 className="text-xl mb-4">Marketing</h3>
      {formData.marketing.map((option) => (
        <div key={option.id} className="flex items-center mb-2">
          <input
            id={option.id}
            type="checkbox"
            checked={option.isChecked}
            onChange={() => handleCheckboxChange('marketing', option.id)}
            className="form-checkbox h-5 w-5 text-indigo-600 mr-2"
          />
          <label htmlFor={option.id} className="text-gray-700">
            {option.label}
          </label>
        </div>
      ))}
    </div>
    <div className="category">
      <h3 className="text-xl mb-4">Support</h3>
      {formData.support.map((option) => (
        <div key={option.id} className="flex items-center mb-2">
          <input
            id={option.id}
            type="checkbox"
            checked={option.isChecked}
            onChange={() => handleCheckboxChange('support', option.id)}
            className="form-checkbox h-5 w-5 text-indigo-600 mr-2"
          />
          <label htmlFor={option.id} className="text-gray-700">
            {option.label}
          </label>
        </div>
      ))}
    </div>
    <div className="category">
      <h3 className="text-xl mb-4">Newsletter</h3>
      {formData.newsletter.map((option) => (
        <div key={option.id} className="flex items-center mb-2">
          <input
            id={option.id}
            type="checkbox"
            checked={option.isChecked}
            onChange={() => handleCheckboxChange('newsletter', option.id)}
            className="form-checkbox h-5 w-5 text-indigo-600 mr-2"
          />
          <label htmlFor={option.id} className="text-gray-700">
            {option.label}
          </label>
        </div>
      ))}
    </div>
  </div>
);
};

export default EmailPreferences;