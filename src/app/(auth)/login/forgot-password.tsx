import { useState } from 'react';
import { useRouter } from 'next/router';

export default function ForgotPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const { token } = router.query;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`/forgot-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword, confirmNewPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Something went wrong');
      } else {
        setSuccess('Password updated successfully');
        router.push('/login');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Internal server error');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold">Reset Password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Confirm New Password</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 py-2 px-4 text-white hover:bg-blue-700"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
