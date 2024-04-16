import React, { ReactNode } from 'react';
import AppWrappers from './AppWrappers';
import { ReduxProvider } from 'store/provider';
// import '@asseinfo/react-kanban/dist/styles.css';
// import '/public/styles/Plugins.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body id={'root'}>
        <ReduxProvider>
          <AppWrappers>{children}</AppWrappers>
        </ReduxProvider>
      </body>
    </html>
  );
}
