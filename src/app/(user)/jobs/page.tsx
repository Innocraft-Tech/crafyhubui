'use client';
import { Button } from '@/components/ui/button';
import { Sidebar } from '@/components/ui/sidebar';
import UserNav from '@/components/ui/usernav';
import { playlists } from '@/data/playlists';
import { Metadata } from 'next';
import { Filters } from '../discover/components/filters';
import { JobsCard } from './components/card';
import JobPost from './newpost/page';
import { useEffect, useState } from 'react';

import SettingsComponent from '@/app/(user)/settings/email-preferences/page';
// export const metadata: Metadata = {
//   title: 'Jobs',
//   description: 'Example music app using the components.',
// };

export default function Jobs() {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  useEffect(() => {
    7;
  });
  return (
    <>
      <h4 className="px-5 py-5">Find Your Dream Jobs</h4>

      <Filters />
      <JobsCard />
    </>
  );
}
