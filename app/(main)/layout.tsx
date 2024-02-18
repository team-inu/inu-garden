'use client';

import Navbar from '@/components/features/navbar/navbar';

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
