import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

interface IProtectedRouteProps {
  withAuth?: boolean;
  //   userRoles?: string[]
  children?: ReactNode;
}

const Wrapper = ({ withAuth, children }: IProtectedRouteProps) => {
  const cookieStore = cookies();
  const token = cookieStore.get('access_token')?.value;

  if (!withAuth && token) {
    redirect('/');
  }
  if (withAuth && !token) {
    redirect('/signin');
  }

  return <>{children}</>;
};

export default Wrapper;
