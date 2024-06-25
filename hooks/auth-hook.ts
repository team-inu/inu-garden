import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { authService } from '@/services/auth-service';

export const useUser = () =>
  useQuery({
    queryKey: ['user'],
    queryFn: () => authService.me(),
    staleTime: Infinity,
    gcTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const user = useUser();

  const signIn = (email: string, password: string, cfToken: string) => {
    authService
      .signIn(email, password, cfToken)
      .then(() => {
        router.push('/course', { scroll: false });
      })
      .catch((error) => {
        toast.error('Cannot sign in to your account', {
          description: error.message,
        });
      });
  };

  const signOut = () => {
    authService.signOut().finally(() => {
      queryClient.removeQueries();
      router.push('/login', { scroll: false });
    });
  };

  return {
    user,
    signIn,
    signOut,
  };
};
