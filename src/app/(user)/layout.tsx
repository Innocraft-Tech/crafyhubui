// 'use client';
import Wrapper from '@/components/layout';
import UserLayout from './components/user-layout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Wrapper withAuth={true}>
      <UserLayout>{children}</UserLayout>
    </Wrapper>
  );
}
