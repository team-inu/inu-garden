import Link from 'next/link';

import { cn } from '@/libs/utils';
import { Role } from '@/types/auth-type';

type MainNavProps = {
  className?: string;
  role?: string;
};

export function MainNav({ className, role }: MainNavProps) {
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      <Link
        href="/course"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Course
      </Link>
      <Link
        href="/student"
        className={cn(
          'text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
          {
            hidden: role === Role.LECTURER,
          },
        )}
      >
        Student
      </Link>
      <Link
        href="/graduation"
        className={cn(
          'text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
          {
            hidden: role === Role.LECTURER,
          },
        )}
      >
        Graduation
      </Link>
      <Link
        href="/user"
        className={cn(
          'text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
          {
            hidden: role === Role.LECTURER,
          },
        )}
      >
        User
      </Link>
      <Link
        href="/prediction"
        className={cn(
          'text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
          {
            hidden: role === Role.LECTURER,
          },
        )}
      >
        Prediction
      </Link>
      <Link
        href="/tabee"
        className={cn(
          'text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
          {
            hidden: role === Role.LECTURER,
          },
        )}
      >
        TABEE
      </Link>
    </nav>
  );
}
