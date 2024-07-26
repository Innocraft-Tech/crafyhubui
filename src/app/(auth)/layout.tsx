'use client';
import Wrapper from '@/components/layout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Wrapper>{children}</Wrapper>;
}
