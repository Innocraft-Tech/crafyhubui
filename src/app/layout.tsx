'use client';
import { Toaster } from '@/components/ui/toaster';
import { ReduxProvider } from '@/redux/provider';

import { Inter } from 'next/font/google';

import { useEffect, useState } from 'react';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const initialTheme = localStorage.getItem('theme') || 'light';
    setIsDarkMode(initialTheme === 'dark');
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          {children}
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
