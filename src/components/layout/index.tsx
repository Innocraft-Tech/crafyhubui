'use server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { ReactNode } from 'react';
interface IProtectedRouteProps {
  withAuth?: boolean;
  //   userRoles?: string[]
  children?: ReactNode;
}

const Wrapper = ({ withAuth, children }: IProtectedRouteProps) => {
  const cookieStore = cookies();
  const token = cookieStore.get('access_token')?.value;

  if (!withAuth && token) {
    redirect('/dashboard');
  }
  if (withAuth && !token) {
    redirect('/login');
  }

  return <>{children}</>;
};

export default Wrapper;
