'use client';
import { Filters } from '../discover/components/filters';
import { JobsCard } from './components/card';

export default function Jobs() {
  return (
    <>
      <h4 className="px-5 py-5">Find Your Dream Jobs</h4>

      <Filters />
      <JobsCard />
    </>
  );
}
