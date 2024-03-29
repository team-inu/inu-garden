'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PassowrdInput } from '@/components/ui/password-input';
import { useAuth } from '@/hooks/auth-hook';
import { useStrictForm } from '@/hooks/form-hook';
import { cn } from '@/libs/utils';
import {
  SigninDefaultValues,
  SigninSchema,
  SigninType,
} from '@/types/schema/auth';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const form = useStrictForm(SigninSchema, SigninDefaultValues);
  const { signIn } = useAuth();

  async function onSubmit(data: SigninType) {
    signIn(data.email, data.password);
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 rounded-lg border px-8 py-12 shadow-md"
        >
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Welcome back
            </h1>
            <p className="text-secondary-foreground">
              Sign in to your account to continue
            </p>
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    autoComplete="username"
                    className="h-9"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PassowrdInput
                    type="password"
                    placeholder=""
                    autoComplete="current-password"
                    className="h-9"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-5">
            <Button type="submit" size="sm" className="w-full">
              Sign in
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
