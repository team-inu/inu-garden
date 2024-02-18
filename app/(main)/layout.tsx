'use client';

import { Inter } from 'next/font/google';

import Navbar from '@/components/features/navbar/navbar';
import { withAuth } from '@/components/features/routes/private-route';

import '../globals.css';

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default RootLayout;
