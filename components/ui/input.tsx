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
              'w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary',
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
          'w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary',
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
