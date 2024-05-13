// 'use client';
import Wrapper from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/ui/sidebar';
import UserNav from '@/components/ui/usernav';
import { playlists } from '@/data/playlists';
import routes from '@/routes';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import TailwindSidebar from './components/tailwind-sidebar';
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
