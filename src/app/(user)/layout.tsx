import Wrapper from '@/components/layout';

import ProgressBar from '@/components/ui/ProgressBar';
import UserLayout from './components/user-layout';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Wrapper withAuth={true}>
      <ProgressBar />
      <UserLayout>{children}</UserLayout>
    </Wrapper>
  );
}
