import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './poviders'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Inu',
  description: 'Inu: Quality Department Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
