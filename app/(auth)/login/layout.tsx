import { ThemeProvider } from "@/providers/ThemeProvider";
import "../../globals.css";

import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Inu",
  description: "Inu: Quality Department Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
