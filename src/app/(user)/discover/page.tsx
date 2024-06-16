'use client';

import { DiscoverCard } from './components/card';
import { Filters } from './components/filters';

export default function Discover(): JSX.Element {
  return (
    <>
      <Filters />
      <DiscoverCard />
    </>
  );
}
