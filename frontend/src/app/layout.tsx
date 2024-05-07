import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Header } from '@/components/header/header';
import { Modal } from '@/components/ui/modal';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'World Calendar',
  description:
    'World calendar to keep track of political and activist events around the world',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'no-scrollbar')}>
        <div className="relative">
          <Modal />
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
