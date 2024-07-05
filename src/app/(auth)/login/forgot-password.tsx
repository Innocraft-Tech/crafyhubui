import { useState } from 'react';
import { useRouter } from 'next/router';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ForgotPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const router = useRouter();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (newPassword === confirmNewPassword) {
      // Logic to handle password reset
      // Example: await resetPassword(newPassword);

      // After successful password reset
      router.push('/login');
    } else {
      alert('Passwords do not match');
    }
  };

  return (
    <div className="container flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>
      <form onSubmit={handlePasswordReset} className="flex flex-col space-y-4">
        <Input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Confirm New Password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          required
        />
        <Button type="submit" className="mt-4">
          Reset Password
        </Button>
      </form>
    </div>
  );
}
