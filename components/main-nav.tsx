import Link from 'next/link';

import { cn } from '@/libs/utils';

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <Link
        href="/course"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <img />
        Course
      </Link>
      <Link
        href="/student"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Student
      </Link>
      <Link
        href="/graduation"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Graduation
      </Link>
      <Link
        href="/lecturer"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Lecturer
      </Link>
      <Link
        href="/tabee"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        TABEE
      </Link>
    </nav>
  );
}
