'use client';

// Error components must be Client Components
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-3">
        <h2 className="text-xl font-bold">Something went wrong! </h2>
        <Link href="/course">Try again</Link>
        <Image className="" src="/images/inu_sleep.png" alt={''} width={160} height={160} />
      </div>
    </div>
  );
}
