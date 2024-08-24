'use client';

import { useState } from 'react';
import { DiscoverCard } from './components/card';
import { Filters } from './components/filters';

export default function Discover(): JSX.Element {
  const [category, setCategory] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [locationArray, setLocations] = useState<string[]>([]);
  return (
    <>
      <Filters
        category={category}
        setCategory={setCategory}
        roles={roles}
        setRoles={setRoles}
        locationArray={locationArray}
        setLocations={setLocations}
      />
      <DiscoverCard
        category={category}
        roles={roles}
        locationArray={locationArray}
      />
    </>
  );
}
