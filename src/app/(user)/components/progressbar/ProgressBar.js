/* eslint-disable react/jsx-filename-extension */
'use client';
import styles from '@/app/cssStyles/Main.module.css';
import { useEffect, useState } from 'react';
const progressBar = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [progress, setProgress] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10,
      );
    }, 600);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <>
      <div className={styles.loadingContainer}>
        <div
          className={styles.loadingBar}
          style={{ width: `${progress} %` }}
        ></div>
      </div>
    </>
  );
};

export default progressBar;
