'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { UserAuthForm } from '@/components/features/auth/user-auth';
import { ModeToggle } from '@/components/mode-toggle';

const LoginPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <div className="container relative hidden h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="absolute right-4 top-4 md:right-8 md:top-8">
          <ModeToggle />
        </div>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <Image
            className="absolute inset-0 bg-zinc-900"
            src="/images/landing.webp"
            layout="fill"
            alt={''}
          />
          <div className="relative z-20 flex items-center space-x-3 text-lg font-medium">
            <Image src="/images/shiba.svg" width={40} height={40} alt="Inu" />
            <div className="text-secondary"> Inu</div>
          </div>
          <div className="relative z-20 mt-auto rounded-lg bg-secondary/80 p-5 hover:animate-pulse">
            <blockquote className="space-y-2">
              <p className="text-secondary-foreground">
                &ldquo;Inu is the best platform for managing your courses and
                assessments. It has everything you need to manage your
                courses.&rdquo;
              </p>
              <footer className="text-secondary-foreground">Inu team</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <div className="text-2xl font-semibold tracking-tight">
                Sign in an account
              </div>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <div>
              <UserAuthForm />
            </div>
            <p className="px-8 text-center text-sm text-muted-foreground">
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
