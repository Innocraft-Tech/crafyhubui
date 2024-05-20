import { Metadata } from 'next';
import Image from 'next/image';

import { Separator } from '@/components/ui/separator';
import { SidebarNav } from '@/components/ui/sidebarnav';
import { Sidebar } from '@/components/ui/sidebar';
import { playlists } from '@/data/playlists';

export const metadata: Metadata = {
  title: 'Forms',
  description: 'Advanced form example using react-hook-form and Zod.',
};

const sidebarNavItems = [
  {
    title: 'account',
    href: '/settings/account',
  },
  {
    title: 'email-preferences',
    href: '/settings/email-preferences',
  },
  {
    title: 'payment-methods',
    href: '/settings/payment-methods',
  },
  {
    title: 'logout',
    href: '/settings/log-out',
  },

];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
        
      <div className="grid grid-cols-1 w-[50%] ">
        <div className=" ">
        {/* <Sidebar playlists={playlists} className="" /> */}
        </div>
        
          <div className="  p-10 pb-16 ">
            
              <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
              <p className="text-muted-foreground">
                Manage your account settings and set e-mail preferences.
              </p>
            
            <Separator className="my-6" />
            <div className=" grid sm:grid-col-2 grid-col-1">
              <aside className="mx-4 ">
                <SidebarNav items={sidebarNavItems} />
              </aside>
              <div className=" ">{children}</div>
            </div>
          </div>
        
      </div>
    </>
  );
}
