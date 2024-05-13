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
  {
    title: 'Display',
    href: '/examples/forms/display',
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
        
      <div className="grid grid-cols-2">
        <div className=" ">
        <Sidebar playlists={playlists} className="" />
        </div>
        <div className=" ">
          <div className=" space-y-6 p-10 pb-16 ">
            <div className="space-y-0.5">
              <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
              <p className="text-muted-foreground">
                Manage your account settings and set e-mail preferences.
              </p>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
              <aside className="-mx-4 lg:w-1/5 ">
                <SidebarNav items={sidebarNavItems} />
              </aside>
              <div className="flex-1 lg:max-w-2xl">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
