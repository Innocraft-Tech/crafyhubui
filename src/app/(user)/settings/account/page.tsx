'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import useUserInfo from '@/lib/hooks/useUserInfo';
import {
  useChangeUserEmailMutation,
  useGetAccountInformationQuery,
} from '@/redux/api/accountInformation';
import { LoaderIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaPencilAlt } from 'react-icons/fa';

const AccountInformation: React.FC = () => {
  const { userInfo } = useUserInfo();
  const {
    data,

    isLoading: GetAccountInformationDataLoading,
  } = useGetAccountInformationQuery(userInfo?._id);

  const [changeUserEmail, { isLoading, error: changeEmailErr }] =
    useChangeUserEmailMutation();

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingDomain, setIsEditingDomain] = useState(false);

  const [email, setEmail] = useState('');
  const [domain, setDomain] = useState('');

  useEffect(() => {
    if (data) {
      setEmail(data.Email);
      setDomain(data.Domain);
    }
  }, [data]);

  const handleEditEmailClick = () => {
    setIsEditingEmail(true);
  };

  const handleEditDomainClick = () => {
    setIsEditingDomain(true);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDomain(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userId = userInfo?._id;
    if (!userId) {
      console.error('User ID is undefined');
      return;
    }
    try {
      await changeUserEmail({ userId, newEmail: email }).unwrap();

      toast({
        title: 'Email changed successfully',
        description: 'Your email has been updated.',
        className: 'bg-green-500 text-white',
      });
    } catch (err) {
      console.error('Error changing email:', changeEmailErr || err);
    }
    setIsEditingEmail(false);
    setIsEditingDomain(false);
  };

  if (GetAccountInformationDataLoading) {
    return (
      <div className="flex min-h-[75vh] items-center justify-center">
        <LoaderIcon className="my-28 h-16 w-16 animate-spin text-primary/60" />
      </div>
    );
  }

  if (changeEmailErr) {
    return <div>Error loading account information.</div>;
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="sm:p6 mx-auto w-full max-w-xl rounded-lg border p-4">
        <h2 className="mb-4 text-xl font-bold sm:text-2xl">
          Account Information
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Email Section */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            {isEditingEmail ? (
              <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  autoFocus
                  className="my-3 flex-1"
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto"
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </Button>
              </div>
            ) : (
              <div
                className="flex cursor-pointer items-center justify-between py-2 text-base sm:text-lg"
                onClick={handleEditEmailClick}
              >
                <p id="email" className="flex-1 text-sm font-bold">
                  {email}
                </p>
                <FaPencilAlt className="text-gray-500 hover:text-gray-700" />
              </div>
            )}
          </div>

          {/* Domain Section */}
          <div className="mt-4">
            <label
              htmlFor="domain"
              className="block text-sm font-medium text-gray-700"
            >
              Domain
            </label>
            {isEditingDomain ? (
              <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-2 sm:space-y-0">
                <Input
                  id="domain"
                  type="text"
                  placeholder="Domain"
                  value={domain}
                  onChange={handleDomainChange}
                  autoFocus
                  className="my-3 flex-1"
                />
                <Button type="submit" className="w-full sm:w-auto">
                  Save
                </Button>
              </div>
            ) : (
              <div
                className="flex cursor-pointer items-center justify-between py-2 text-base sm:text-lg"
                onClick={handleEditDomainClick}
              >
                <p id="domain" className="flex-1 text-sm font-bold">
                  {domain}
                </p>
                <FaPencilAlt className="text-gray-500 hover:text-gray-700" />
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountInformation;
