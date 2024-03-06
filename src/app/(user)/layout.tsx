import Wrapper from '@/components/layout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Wrapper withAuth={true}>{children}</Wrapper>;
}
