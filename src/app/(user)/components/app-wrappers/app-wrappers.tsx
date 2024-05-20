'use client';
import React, { ReactNode } from 'react';
import dynamic from 'next/dynamic';

const NoSSRWrapper = ({ children }: { children: React.ReactNode }) => (
  <React.Fragment>{children}</React.Fragment>
);

const NoSSR = dynamic(() => Promise.resolve(NoSSRWrapper), {
  ssr: false,
});

export default function AppWrappers({ children }: { children: ReactNode }) {
  return <NoSSR>{children}</NoSSR>;
}
