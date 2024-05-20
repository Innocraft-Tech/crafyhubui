'use client';
import { Filters } from '../discover/components/filters';
import { JobsCard } from './components/card';
import { useState } from 'react';

// export const metadata: Metadata = {
//   title: 'Jobs',
//   description: 'Example music app using the components.',
// };

export default function Jobs() {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  // useEffect(() => {
  //   7;
  // });
  return (
    <>
      <h4 className="px-5 py-5">Find Your Dream Jobs</h4>

      <Filters />
      <JobsCard />
    </>
  );
}
