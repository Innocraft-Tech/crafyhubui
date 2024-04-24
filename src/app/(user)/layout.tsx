import Wrapper from 'components/layout';
import AppWrappers from './AppWrappers';
import UserLayout from './UserLayout';

export default function User({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper withAuth={true}>
      <AppWrappers>
        <UserLayout>{children}</UserLayout>
      </AppWrappers>
    </Wrapper>
  );
}
