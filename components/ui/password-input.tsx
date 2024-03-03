import { EyeIcon, EyeOffIcon } from 'lucide-react';
import * as React from 'react';

import { Input } from '@/components/ui/input';
import { cn } from '@/libs/utils';

export interface PassowrdInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PassowrdInput = React.forwardRef<HTMLInputElement, PassowrdInputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    return (
      <Input
        type={showPassword ? 'text' : 'password'}
        className={cn('file:rounded-md', className)}
        ref={ref}
        {...props}
        suffix={
          showPassword ? (
            <EyeIcon onClick={() => setShowPassword((prev) => !prev)} />
          ) : (
            <EyeOffIcon onClick={() => setShowPassword((prev) => !prev)} />
          )
        }
      />
    );
  },
);
PassowrdInput.displayName = 'PassowrdInput';

export { PassowrdInput };
