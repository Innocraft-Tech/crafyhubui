'use client';
import { Filters } from './components/filters';
import { DiscoverCard } from './components/card';
import { Signal } from 'lucide-react';

export default function Discover() {
  return (
    <>
      <Filters />
      <DiscoverCard />
    </>
  );
}
