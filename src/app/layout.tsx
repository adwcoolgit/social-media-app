'use client';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../styles/globals.css';
import Providers from '@/providers/provider';
import { InitAuth } from '@/lib/initAuth';
import clsx from 'clsx';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={clsx(`font-sfpro bg-black antialiased`)}>
        <Providers>
          <InitAuth />
          {children}
        </Providers>
      </body>
    </html>
  );
}
