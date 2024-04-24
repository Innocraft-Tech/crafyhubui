import React, { ReactNode } from 'react';
import { ReduxProvider } from 'store/provider';
// import '@asseinfo/react-kanban/dist/styles.css';
// import '/public/styles/Plugins.css';
import 'styles/App.css';
import 'styles/Contact.css';
import 'styles/index.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body id={'root'}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
