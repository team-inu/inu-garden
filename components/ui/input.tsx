import * as React from 'react';

import { cn } from '@/libs/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  suffix?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ suffix, className, type, ...props }, ref) => {
    if (suffix) {
      return (
        <div className="relative">
          <input
            ref={ref}
            type={type}
            className={cn(
              '"flex disabled:opacity-50" h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed',
              className,
            )}
            {...props}
          />
          {suffix && (
            <div className="absolute inset-y-0 right-0 flex items-center px-2">
              {suffix}
            </div>
          )}
        </div>
      );
    }
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          '"flex disabled:opacity-50" h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed',
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
