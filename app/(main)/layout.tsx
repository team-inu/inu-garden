"use client";
import "../globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/features/navbar/navbar";
import { withAuth } from "@/components/features/routes/private-route";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default withAuth(RootLayout);
