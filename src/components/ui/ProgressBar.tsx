'use client';

import { RootState } from '@/redux/store';
import { QueryStatus } from '@reduxjs/toolkit/query';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // Import default styles for NProgress
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ProgressBar: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false); // State to detect initial mount

  const isFetching = useSelector((state: RootState) =>
    Object.values(state.api.queries).some(
      (query) => query?.status === QueryStatus.pending,
    ),
  );

  useEffect(() => {
    NProgress.configure({ showSpinner: false, speed: 250, minimum: 0.1 });
    setMounted(true); // Set mounted to true after the initial render
  }, []);

  useEffect(() => {
    if (mounted) {
      if (isFetching) {
        NProgress.start();
      } else {
        NProgress.done();
      }
    }
  }, [isFetching, mounted]);

  useEffect(() => {
    if (mounted) {
      NProgress.start();

      const handleComplete = () => {
        setTimeout(() => {
          if (!isFetching) {
            NProgress.done();
          }
        }, 1000); // Ensure the progress bar is visible for at least 1 second
      };

      handleComplete(); // Complete progress on mount

      return () => {
        handleComplete(); // Ensure progress is completed on unmount
      };
    }
  }, [pathname, searchParams, mounted]);

  return null;
};

export default ProgressBar;
