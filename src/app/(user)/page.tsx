'use client';
import useUserInfo from '@/lib/hooks/useUserInfo';
import { redirect } from 'next/navigation';

export default function Home() {
  // const state = useAppSelector((state) => state);
  useUserInfo();
  redirect('/dashboard');

  return <></>;
}
