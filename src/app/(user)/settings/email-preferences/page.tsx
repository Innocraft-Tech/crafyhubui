'use client';
import { toast } from '@/components/ui/use-toast';
import useUserInfo from '@/lib/hooks/useUserInfo';
import { useUpdateEmailPreferencesMutation } from '@/redux/api/usersApi';
import React, { useEffect, useState } from 'react';
type CheckboxOption = {
  id: number;
  label: string;
  isChecked: boolean;
  title: string;
};

type FormData = {
  marketing: CheckboxOption[];
  support: CheckboxOption[];
  suggestion: CheckboxOption[];
  newsletter: CheckboxOption[];
  unsubscribe: CheckboxOption[];
};

const initialFormData: FormData = {
  marketing: [
    {
      id: 0,
      title: 'Marketing Updates',
      label: 'Email me with Contra updates and promotions',
      isChecked: false,
    },
  ],
  support: [
    {
      id: 1,
      title: 'Support Requests',
      label:
        'Include emails sent directly from hello@contra.com in response to support requests',
      isChecked: false,
    },
  ],
  suggestion: [
    {
      id: 2,
      title: 'Profile Suggestions',
      label:
        'Send suggestions to improve my profile or share other tips based on successful or high-performing profiles that are similar to mine.',
      isChecked: false,
    },
  ],
  newsletter: [
    {
      id: 3,
      title: 'Contra News',
      label:
        'Keep in touch with the latest Contra news, including new features and upcoming events.',
      isChecked: false,
    },
  ],
  unsubscribe: [
    {
      id: 4,
      title: 'Unsubscribe from all emails',
      label: 'Unsubscribe from all emails',
      isChecked: false,
    },
  ],
};

const EmailPreferences: React.FC = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [allUnchecked, setAllUnchecked] = useState(false);

  const [updateEmailPreferences] = useUpdateEmailPreferencesMutation();
  const { userInfo } = useUserInfo();
  useEffect(() => {
    const isUnsubscribeChecked = formData.unsubscribe.some(
      (option) => option.isChecked,
    );
    setIsButtonDisabled(!isUnsubscribeChecked);
  }, [formData]);

  const handleCheckboxChange = (category: keyof FormData, id: number) => {
    setFormData((prevData) => {
      const updatedCategory = (prevData[category] || []).map((option) =>
        option.id === id ? { ...option, isChecked: !option.isChecked } : option,
      );

      return {
        ...prevData,
        [category]: updatedCategory,
      };
    });
  };
  const handleUnsubscribeAll = () => {
    setAllUnchecked(!allUnchecked);
    setFormData((prevData) => {
      const updatedData = Object.keys(prevData).reduce((acc, key) => {
        acc[key as keyof FormData] = prevData[key as keyof FormData].map(
          (option) => ({ ...option, isChecked: !allUnchecked }),
        );
        return acc;
      }, {} as FormData);
      return updatedData;
    });
  };

  const handleSubmit = async () => {
    const preferences: string[] = [];

    for (const key of Object.keys(formData)) {
      // Ensure key is one of the FormData keys
      const category = key as keyof FormData;

      formData[category].forEach((item) => {
        if (item.isChecked) {
          preferences.push(item.title);
        }
      });
    }

    try {
      if (preferences.length === 0) {
        toast({
          title: 'Please select at least one option',
          variant: 'destructive',
        });
      } else {
        const result = await updateEmailPreferences({
          userId: userInfo?._id, // Replace with the actual user ID
          preferences,
        }).unwrap();

        toast({
          title: `${result.message}`,
        });
      }
    } catch (error) {
      console.error('Failed to update preferences:', error, isButtonDisabled);
    }
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
                  id={option.id.toString()}
                  type="checkbox"
                  checked={option.isChecked}
                  onChange={() => handleCheckboxChange('marketing', option.id)}
                  className="form-checkbox relative top-1 mr-2 h-5 w-5"
                  style={{
                    borderColor: '#ff0055',
                    backgroundColor: option.isChecked
                      ? '#ff0055'
                      : 'transparent',
                  }}
                />
                <h3 className="text-md inline font-bold">Marketing</h3>
                <label
                  htmlFor={option.id.toString()}
                  className="my-2 block text-gray-400"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          <div className="category mx-2 my-2">
            {formData.support.map((option) => (
              <div key={option.id} className="mb-2">
                <input
                  id={option.id.toString()}
                  type="checkbox"
                  checked={option.isChecked}
                  onChange={() => handleCheckboxChange('support', option.id)}
                  className="form-checkbox relative top-1 mr-2 h-5 w-5"
                  style={{
                    borderColor: '#ff0055',
                    backgroundColor: option.isChecked
                      ? '#ff0055'
                      : 'transparent',
                  }}
                />
                <h3 className="text-md inline font-bold">Support</h3>
                <label
                  htmlFor={option.id.toString()}
                  className="my-2 block text-gray-400"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          <div className="category mx-2 my-2">
            {formData.suggestion.map((option) => (
              <div key={option.id} className="mb-2">
                <input
                  id={option.id.toString()}
                  type="checkbox"
                  checked={option.isChecked}
                  onChange={() => handleCheckboxChange('suggestion', option.id)}
                  className="form-checkbox relative top-1 mr-2 h-5 w-5 text-indigo-600"
                />
                <h3 className="text-md inline font-bold">
                  Profile Suggestions
                </h3>
                <label
                  htmlFor={option.id.toString()}
                  className="my-2 block text-gray-400"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
          <div className="category mx-2 my-2">
            {formData.newsletter.map((option) => (
              <div key={option.id} className="mb-2">
                <input
                  id={option.id.toString()}
                  type="checkbox"
                  checked={option.isChecked}
                  onChange={() => handleCheckboxChange('newsletter', option.id)}
                  className="form-checkbox relative top-1 mr-2 h-5 w-5 text-indigo-600"
                />
                <h3 className="text-md inline font-bold">Newsletter</h3>
                <label
                  htmlFor={option.id.toString()}
                  className="my-2 block text-gray-400"
                >
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
              checked={allUnchecked}
              onChange={handleUnsubscribeAll}
              className="relative top-1 mx-2 mt-3 h-[20px] w-[20px]"
            />
            <span className="text-md mb-2 font-bold">
              Unsubscribe from all emails
            </span>
            <button
              type="button"
              onClick={handleSubmit}
              className="text-md my-5 w-[60%] cursor-pointer rounded-[50px] bg-black px-3 py-2 font-bold text-white"
            >
              {' '}
              Update Email Preference
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailPreferences;
