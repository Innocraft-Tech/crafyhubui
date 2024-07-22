'use client';
import { Filters } from '../discover/components/filters';
import JobsCard from './components/JobCard';

// export const metadata: Metadata = {
//   title: 'Jobs',
//   description: 'Example music app using the components.',
// };

export default function Jobs() {
  return (
    <>
      {/* <h4 className="px-5 py-5 pb-0">Find Your Dream Jobs</h4> */}

      <Filters />

      <JobsCard />
    </>
  );
}
