'use client';
export default function ForgotPassword() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold">Reset Password</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium">New Password</label>
          <input
            type="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Confirm New Password
          </label>
          <input
            type="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
