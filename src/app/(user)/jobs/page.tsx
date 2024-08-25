'use client';
import { useState } from 'react';
import { Filters } from '../discover/components/filters';
import JobsCard from './components/JobCard';

// export const metadata: Metadata = {
//   title: 'Jobs',
//   description: 'Example music app using the components.',
// };

export default function Jobs() {
  const [category, setCategory] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  return (
    <>
      {/* <h4 className="px-5 py-5 pb-0">Find Your Dream Jobs</h4> */}

      <Filters
        category={category}
        setCategory={setCategory}
        roles={roles}
        setRoles={setRoles}
        locationArray={[]}
        setLocations={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <JobsCard />
    </>
  );
}
