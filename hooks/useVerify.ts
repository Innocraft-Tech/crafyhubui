import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface IProtectedRouteProps {
  withAuth?: boolean;
}

export default function useVerify({ withAuth }: IProtectedRouteProps) {
  const cookieStore = cookies();
  const token = cookieStore.get('access_token')?.value;

  if (!withAuth && token) {
    redirect('/dashboard');
  }
  if (withAuth && !token) {
    redirect('/login');
  }
}
