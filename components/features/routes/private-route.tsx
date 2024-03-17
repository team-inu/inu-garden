import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ComponentType, ReactNode, useEffect } from 'react';
import { toast } from 'sonner';

import NoPermission from '@/components/no-permission';
import { useAuth } from '@/hooks/auth-hook';
import { Role } from '@/types/auth-type';

export type WithAuthProps = {
  children?: ReactNode;
  role?: Role[];
};

export function withAuth<T extends WithAuthProps = WithAuthProps>(
  WrappedComponent: ComponentType<T>,
  role: Role[] = [
    Role.LECTURER,
    Role.MODERATOR,
    Role.HEAD_OF_CURRICULUM,
    Role.TABEE_MANAGER,
  ],
  herf: string = '/login',
) {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ComponentWithAuth = (props: Omit<T, keyof WithAuthProps>) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (user.isError) {
        toast.warning('Authentication is required', {
          description: 'Please sign in to continue',
        });
      }
    }, [user.isError]);

    if (user.isLoading) {
      return (
        <div className="flex h-screen flex-col items-center justify-center">
          <div className="flex text-muted-foreground">
            <Loader2Icon className="mr-2 animate-spin" /> Loading...
          </div>
        </div>
      );
    }

    //if user role is not admin or super admin redirect course page
    if (user.data && !role.includes(user.data.role)) {
      return <NoPermission />;
    }

    return user.isError ? (
      router.replace(herf)
    ) : (
      <WrappedComponent {...(props as T)} />
    );
  };
  ComponentWithAuth.displayName = `withAuth(${displayName})`;

  return ComponentWithAuth;
}
